"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from "@/components/ui/textarea"


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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


// Define the schema for the form using zod
const formSchema = z.object({
  patientname: z.string().max(50),
  agegroup: z.string().max(50),
  bloodgroup: z.string().max(50),
  gender: z.string().max(50),
  phonenumber: z.string().max(50),
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
      agegroup: "",
      bloodgroup: "",
      gender: "",
      phonenumber: "",
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
        <Card className="w-full max-w-3xl p-30 bg-white shadow-lg rounded-lg mt-20">
          <CardContent>
            <div className="w-full mx-auto p-4 bg-white shadow-lg rounded-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  {/* Other form fields here */}
                  
                 
                    <div className="grid">
                      <FormField
                        control={form.control}
                        name="patientname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Patient Name</FormLabel>
                            <FormControl>
                              <Input 
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Patient Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid">
                      <FormField
                        control={form.control}
                        name="agegroup"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AgeGroup</FormLabel>
                            <FormControl>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Input 
                               
                                placeholder="Select Age Group" {...field} className="w-full p-2 border border-gray-300 rounded-md"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onSelect={ () => field.onChange('Infant')}> Infant </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('Child')}> Child </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('Teenage')}> Teenage </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('Adult')}> Adult </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('Senior')}> Senior </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
  

                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
              
                  <div className="grid">
                    <FormField
                      control={form.control}
                      name="bloodgroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Group</FormLabel>
                          <FormControl>
                          <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Input placeholder="Select Blood Group" {...field} className="w-full p-2 border border-gray-300 rounded-md" readOnly />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onSelect={ () => field.onChange('A+')}> A+ </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('A-')}> A- </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('B+')}> B+ </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('B-')}> B- </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('AB+')}> AB+ </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('AB-')}> AB- </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('O+')}> O+ </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('O-')}> O- </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                          <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Input placeholder="Select Gender" {...field} className="w-full p-2 border border-gray-300 rounded-md" readOnly />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onSelect={ () => field.onChange('Male')}> Male </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('Female')}> Female </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('Other')}> Other </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid">
                    <FormField
                      control={form.control}
                      name="phonenumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Phone Number" {...field} className="w-full p-2 border border-gray-300 rounded-md"/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Location" {...field} className="w-full p-2 border border-gray-300 rounded-md" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid">
                    <FormField
                      control={form.control}
                      name="units"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Units</FormLabel>
                          <FormControl>
                          <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Input placeholder="Select Units" {...field} className="w-full p-2 border border-gray-300 rounded-md" readOnly />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onSelect={ () => field.onChange('1')}> 1 Unit </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('2 Units')}> 2 Units </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('3 Units')}> 3 Units </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('4 Units')}> 4 Units </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('5 Units')}> 5 Units </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={ () => field.onChange('10 Units ')}> 10 Units </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Date Picker Field */}
                  <div className="grid">
                    <FormField
                      control={form.control}
                      name="requiredbefore"
                      render={({ field }) => (
                        <FormItem className="required-before-field" >
                          <FormLabel>Required Before</FormLabel>
                          <FormControl>
                            <div className="w-full p-2 border border-gray-300 rounded-md">
                            <DatePicker 
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              dateFormat="yyyy-MM-dd"
                              className="input"
                            />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid">
                    <FormField
                      control={form.control}
                      name="reason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reason for Requirement</FormLabel>
                          <FormControl>
                            
                            <Textarea className="w-full p-2 border border-gray-300 rounded-md" placeholder="Reason for Requirement" {...field} />
                           
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
