import {z} from "zod";
export const services=["Smile Design","Orthodontics","Restorative Dentistry","Preventive Care","General Consultation","Other"] as const;
export const appointmentSchema=z.object({
 full_name:z.string().trim().min(2).max(100), phone:z.string().trim().regex(/^[0-9+\s().-]{7,20}$/,"Enter a valid phone number."),
 email:z.string().trim().max(160).email("Enter a valid email.").optional().or(z.literal("")),
 preferred_date:z.string().refine(v=>{const d=new Date(v+"T00:00:00");const t=new Date();t.setHours(0,0,0,0);return d>=t},"Choose a current or future date."),
 preferred_time:z.string().min(1).max(20), service:z.enum(services), message:z.string().trim().max(1000).optional().or(z.literal("")), consent:z.literal(true)
});
export type AppointmentInput=z.infer<typeof appointmentSchema>;
