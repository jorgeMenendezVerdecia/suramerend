import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, Calendar, Send } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import quejasImage from "@/assets/quejas-bpmn.webp";
import apelacionesImage from "@/assets/apelaciones-bpmn.webp";
import { useToast } from "@/hooks/use-toast";

const ComplaintsSection = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDiagramOpen, setIsDiagramOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: "Queja",
        presenter: "",
        position: "",
        represents: "",
        email: "",
        otherContact: "",
        channel: "",
        hasDocument: "No",
        documentDescription: "",
        attachments: [] as File[],
        details: "",
    });

    const workerEndpoint =
        import.meta.env.VITE_EMAIL_SEND_ENDPOINT?.trim() || "/api/email-send";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === "type") {
            // Auto-open diagram for Queja or Apelación
            if (value === "Queja" || value === "Apelación") {
                setIsDiagramOpen(true);
            } else {
                setIsDiagramOpen(false);
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setFormData(prev => ({ ...prev, attachments: files }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const currentDate = new Date().toLocaleDateString("es-ES");
            // Build payload matching ContactSection shape to satisfy backend validation
            const payload = {
                subject: `QUEJA/APELACIÓN | ${formData.presenter.trim() || "Remitente Anónimo"}`,
                to: "operaciones@suramerend.com",
                replyTo: formData.email.trim(),
                data: {
                    company: formData.represents.trim(),
                    fullName: formData.presenter.trim(),
                    phone: formData.otherContact.trim(),
                    email: formData.email.trim(),
                    message: [
                        `Tipo: ${formData.type}`,
                        `Fecha: ${currentDate}`,
                        `Cargo: ${formData.position.trim()}`,
                        `Representa a: ${formData.represents.trim()}`,
                        `Vía/Medio: ${formData.channel.trim()}`,
                        `Descripción documento: ${formData.documentDescription.trim()}`,
                        "",
                        "Detalle:",
                        formData.details.trim(),
                    ].join("\n"),
                },
                text: [
                    `Empresa: ${formData.represents.trim()}`,
                    `Contacto: ${formData.presenter.trim()}`,
                    `Teléfono: ${formData.otherContact.trim() || "No proporcionado"}`,
                    `Correo Electrónico: ${formData.email.trim() || "No proporcionado"}`,
                    "",
                    "Mensaje:",
                    formData.details.trim(),
                ].join("\n"),
            };

            // FormData permite enviar archivos adjuntos junto con los campos
            const fd = new FormData();
            fd.append("subject", payload.subject);
            fd.append("to", payload.to);
            if (payload.replyTo) fd.append("replyTo", payload.replyTo);
            fd.append("text", payload.text);
            fd.append("data", JSON.stringify(payload.data));
            for (const file of formData.attachments) {
                fd.append("attachments", file, file.name);
            }

            const response = await fetch(workerEndpoint, {
                method: "POST",
                body: fd,
            });

            if (!response.ok) throw new Error(`(${response.status})`);

            toast({
                title: "Formulario Enviado",
                description: "Gracias. Su comunicación ha sido recibida y será atendida.",
            });

            setFormData({
                type: "Queja",
                presenter: "",
                position: "",
                represents: "",
                email: "",
                otherContact: "",
                channel: "",
                hasDocument: "No",
                documentDescription: "",
                attachments: [],
                details: "",
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Error desconocido";
            toast({
                title: "Error al enviar",
                description: `No se pudo enviar el formulario. ${message}`,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="reclamos" className="py-20 bg-background/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Formulario de Quejas / Apelaciones</h2>
                    <p className="text-muted-foreground max-w-3xl mx-auto">Complete la siguiente información para presentar su queja, apelación o sugerencia.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle className="text-2xl text-card-foreground flex items-center gap-2">
                                <FileText className="w-6 h-6 text-primary" />
                                Presentar Queja / Apelación
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Tipo</label>
                                        <div className="flex items-center gap-2">
                                            <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-background border-border p-2 rounded">
                                                <option>Queja</option>
                                                <option>Apelación</option>
                                                <option>Sugerencia</option>
                                                <option>Otro</option>
                                            </select>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => setIsDiagramOpen(true)}
                                                disabled={formData.type !== "Queja" && formData.type !== "Apelación"}
                                                aria-label={`Ver diagrama ${formData.type}`}
                                            >
                                                <FileText className="w-4 h-4" />
                                                <span className="hidden sm:inline ml-2">Ver diagrama</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <Dialog open={isDiagramOpen} onOpenChange={setIsDiagramOpen}>
                                    <DialogContent className="w-full mx-auto max-w-[min(1200px,calc(100vw-3rem))] my-6 max-h-[90vh] p-0">
                                        <DialogHeader className="text-center">
                                            <DialogTitle className="mx-auto">Diagrama BPMN</DialogTitle>
                                            <DialogDescription className="mx-auto">
                                                Diagrama correspondiente a {formData.type}.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="p-4 overflow-auto">
                                            {formData.type === "Queja" && (
                                                <img src={quejasImage} alt="Diagrama BPMN - Quejas" className="w-full h-auto max-h-[75vh] object-contain rounded" />
                                            )}
                                            {formData.type === "Apelación" && (
                                                <img src={apelacionesImage} alt="Diagrama BPMN - Apelaciones" className="w-full h-auto max-h-[75vh] object-contain rounded" />
                                            )}
                                            {formData.type !== "Queja" && formData.type !== "Apelación" && (
                                                <p className="text-sm text-muted-foreground">No hay diagrama disponible para este tipo.</p>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Persona que presenta *</label>
                                        <Input name="presenter" value={formData.presenter} onChange={handleInputChange} required placeholder="Nombre completo" className="bg-background border-border" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Cargo</label>
                                        <Input name="position" value={formData.position} onChange={handleInputChange} placeholder="Cargo" className="bg-background border-border" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Representa a</label>
                                        <Input name="represents" value={formData.represents} onChange={handleInputChange} placeholder="Empresa u organización" className="bg-background border-border" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Correo Electrónico *</label>
                                        <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="su.email@ejemplo.com" className="bg-background border-border" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Otros datos de contacto</label>
                                        <Input name="otherContact" value={formData.otherContact} onChange={handleInputChange} placeholder="Teléfono, dirección" className="bg-background border-border" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">Vía o medio</label>
                                        <Input name="channel" value={formData.channel} onChange={handleInputChange} placeholder="Teléfono, correo, presencial" className="bg-background border-border" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Documentos adjuntos <span className="font-normal text-muted-foreground">(opcional — PDF, Word, Excel, imágenes)</span>
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                        onChange={handleFileChange}
                                        className="block w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                                    />
                                    {formData.attachments.length > 0 && (
                                        <p className="mt-1.5 text-xs text-muted-foreground">
                                            {formData.attachments.length} archivo(s) seleccionado(s):{" "}
                                            {formData.attachments.map(f => f.name).join(", ")}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">Por favor describa su planteamiento de manera concreta, claro y con detalles *</label>
                                    <Textarea name="details" value={formData.details} onChange={handleInputChange} required rows={8} className="bg-background border-border" />
                                </div>

                                <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
                                    <Send className="w-4 h-4 mr-2" />
                                    {isSubmitting ? "Enviando..." : "Enviar"}
                                </Button>

                                <p className="text-xs text-muted-foreground text-center">* Campos obligatorios. SURAMER END S.A. dará atención y seguimiento a su planteamiento. Recibirá una notificación vía oficio o e-mail.</p>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="bg-card border-border">
                            <CardContent className="p-6">
                                <h4 className="font-semibold text-card-foreground mb-2">Información</h4>
                                <p className="text-sm text-muted-foreground">Puede presentar quejas, apelaciones o sugerencias usando este formulario. Su caso será evaluado y se le notificará por correo o oficio.</p>
                                <div className="mt-4 flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-sm font-semibold">operaciones@suramerend.com</p>
                                        <p className="text-xs text-muted-foreground">También se envía copia al equipo responsable.</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <div>
                                        <p className="text-sm font-semibold">Horario de atención</p>
                                        <p className="text-xs text-muted-foreground">24/7</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComplaintsSection;
