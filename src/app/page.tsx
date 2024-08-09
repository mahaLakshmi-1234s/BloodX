"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Navbar from "@/app/Navbar";

// Define the schema for the form using zod
const formSchema = z.object({
  patientname: z.string().max(50),
  age: z.string().max(50),
  bloodgroup: z.string().max(50),
  gender: z.string().max(50),
  phone: z.string().max(50),
  location: z.string().max(50),
  units: z.string().max(50),
  requiredbefore: z.date(), // Expect a date object here
  reason: z.string().max(50),
});

// Define the type of the form data based on the schema
type FormData = z.infer<typeof formSchema>;

export default function BloodRequestForm() {
  // Initialize the form using React Hook Form and Zod for validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientname: "",
      age: "",
      bloodgroup: "",
      gender: "",
      phone: "",
      location: "",
      units: "",
      requiredbefore: new Date(), // Default to today's date
      reason: "",
    },
  });

  // Submit handler for the form
  async function onSubmit(values: FormData) {
    // Format the date as dd-mm-yyyy
    const formattedDate = format(values.requiredbefore, "yyyy-MM-dd");
    
    const apiData = {
      ...values,
      requiredbefore: formattedDate, // Replace with the formatted date
    };

    console.log("Values to be sent to the API:", apiData);

    try {
      const response = await fetch('http://localhost:2007/BloodX/Hospital/AddBloodRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex h-screen justify-center items-center">
        <Card className="mx-auto max-w-sm">
          <CardContent>
            <div className="grid gap-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {/* Other form fields here */}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="patientname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Patient Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Patient Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                              <Input placeholder="Age" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <Input placeholder="Gender" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="units"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Units</FormLabel>
                          <FormControl>
                            <Input placeholder="Units" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Date Picker Field */}
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="requiredbefore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Required Before</FormLabel>
                          <FormControl>
                            <DatePicker
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              dateFormat="yyyy-MM-dd"
                              className="input"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for Requirement</FormLabel>
                          <FormControl>
                            <Input placeholder="Reason" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
