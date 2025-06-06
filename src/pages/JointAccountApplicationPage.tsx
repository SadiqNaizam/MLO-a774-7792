import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import GuidedFlowStepIndicator from '@/components/GuidedFlowStepIndicator'; // Custom component
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { LayoutDashboard, Landmark, Users, Settings, LogOut, UserPlus, FileText, ShieldCheck, Info, Mail, Phone, CalendarDays, Home, Briefcase, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form'; // For form structure
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const steps = [
  { id: 1, name: 'Introduction', status: 'current' as 'current' | 'completed' | 'upcoming' },
  { id: 2, name: 'Your Details', status: 'upcoming' as 'current' | 'completed' | 'upcoming' },
  { id: 3, name: 'Applicant 2', status: 'upcoming' as 'current' | 'completed' | 'upcoming' },
  { id: 4, name: 'Documents', status: 'upcoming' as 'current' | 'completed' | 'upcoming' },
  { id: 5, name: 'Review & Submit', status: 'upcoming' as 'current' | 'completed' | 'upcoming' },
];

// Example Zod schema for one step (adapt as needed for multi-step)
const applicantDetailsSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date of birth."}), // Basic validation
  address: z.string().min(5, { message: "Address is too short."}),
  employmentStatus: z.string().min(1, {message: "Please select employment status."}),
});

type ApplicantDetailsFormValues = z.infer<typeof applicantDetailsSchema>;


const JointAccountApplicationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationProgress, setApplicationProgress] = useState(20); // Example progress
  const navigate = useNavigate();

  const form = useForm<ApplicantDetailsFormValues>({
    resolver: zodResolver(applicantDetailsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      address: "",
      employmentStatus: "",
    },
    mode: "onChange", // Validate on change for better UX
  });


  console.log('JointAccountApplicationPage loaded, current step:', currentStep);

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      steps.forEach(step => {
        if (step.id < newStep) step.status = 'completed';
        else if (step.id === newStep) step.status = 'current';
        else step.status = 'upcoming';
      });
      setApplicationProgress(newStep * 20); // Update progress
    } else {
      // Handle final submission
      console.log('Application Submitted');
      alert('Application Submitted Successfully!');
      navigate('/dashboard');
    }
  };
  
  const onSubmit: SubmitHandler<ApplicantDetailsFormValues> = (data) => {
    console.log("Form data for step:", currentStep, data);
    handleNextStep();
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Introduction
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-[#0051B4]">Open a Joint Account Together</h2>
            <p className="text-gray-600">
              Applying for a joint account is simple and secure. This account allows two individuals to manage funds together,
              making it perfect for shared expenses, savings goals, or managing household finances.
            </p>
            <Alert className="bg-blue-50 border-blue-200 text-blue-700">
              <Info className="h-5 w-5 text-[#00A8E1]" />
              <AlertTitle className="font-semibold">Before you start, please ensure:</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Both applicants are 18 years or older.</li>
                  <li>You have valid identification documents ready (if required later).</li>
                  <li>You have details for the second applicant (or they are available to complete their part).</li>
                </ul>
              </AlertDescription>
            </Alert>
            <p className="text-gray-600">The process typically takes about 10-15 minutes to complete.</p>
          </div>
        );
      case 2: // Primary Applicant Details
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold text-[#0051B4]">Your Details (Applicant 1)</h3>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input placeholder="John Doe" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                     <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input type="email" placeholder="you@example.com" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                     <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input type="tel" placeholder="(123) 456-7890" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                     <FormControl>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input type="date" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Residential Address</FormLabel>
                     <FormControl>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input placeholder="123 Main St, Anytown, USA" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                           <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
                           <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="employed">Employed</SelectItem>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="unemployed">Unemployed</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="retired">Retired</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
               {/* Submit button for this step's form */}
              <Button type="submit" className="w-full bg-[#00A8E1] hover:bg-[#007AB5] text-white">
                Save & Continue
              </Button>
            </form>
          </Form>
        );
      case 3: // Second Applicant
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-[#0051B4]">Second Applicant Details</h3>
            <p className="text-gray-600">
              Please provide details for the second applicant or send them an invitation to complete their section.
            </p>
            <RadioGroup defaultValue="provide_details" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="provide_details" id="r1" />
                <Label htmlFor="r1">I will provide details for Applicant 2 now.</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="send_invite" id="r2" />
                <Label htmlFor="r2">Send an invitation to Applicant 2 to fill their details.</Label>
              </div>
            </RadioGroup>
            {/* Conditional form fields based on RadioGroup selection */}
            <Input type="email" placeholder="Applicant 2 Email (if sending invite)" className="mt-4" />
            <Alert variant="default" className="mt-4 bg-yellow-50 border-yellow-300 text-yellow-800">
                <Info className="h-4 w-4" />
                <AlertDescription>If Applicant 2 completes their part via invite, you'll be notified to continue.</AlertDescription>
            </Alert>
          </div>
        );
      case 4: // Document Upload
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-[#0051B4]">Document Upload</h3>
            <p className="text-gray-600">
              Please upload any required identification documents for both applicants.
              Accepted formats: PDF, JPG, PNG. Max size: 5MB.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="doc1">Applicant 1 - ID Document (e.g., Driver's License)</Label>
                <Input id="doc1" type="file" className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00A8E1] file:text-white hover:file:bg-[#007AB5]"/>
              </div>
              <div>
                <Label htmlFor="doc2">Applicant 2 - ID Document (e.g., Passport)</Label>
                <Input id="doc2" type="file" className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00A8E1] file:text-white hover:file:bg-[#007AB5]"/>
              </div>
            </div>
            <Progress value={33} className="w-full mt-2 [&>div]:bg-[#00A8E1]" />
            <p className="text-sm text-gray-500">File_name.pdf uploaded (33%)</p>
          </div>
        );
      case 5: // Review & Submit
        return (
          <div className="space-y-6 p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold text-[#0051B4]">Review & Submit Application</h3>
            <p className="text-gray-600">Please review all the information carefully before submitting.</p>
            {/* Placeholder for displaying summarized application data */}
            <Card>
                <CardHeader><CardTitle>Applicant 1: John Doe (Details...)</CardTitle></CardHeader>
                <CardContent><p>Email: john.doe@example.com, Phone: ..., DOB: ...</p></CardContent>
            </Card>
             <Card className="mt-4">
                <CardHeader><CardTitle>Applicant 2: Jane Smith (Details...)</CardTitle></CardHeader>
                <CardContent><p>Email: jane.smith@example.com, Phone: ..., DOB: ...</p></CardContent>
            </Card>
            <div className="items-top flex space-x-2 mt-6">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms1" className="font-medium">
                  I confirm that all information provided is accurate and complete.
                </Label>
              </div>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox id="terms2" />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="terms2" className="font-medium">
                  I agree to the <Link to="/terms" className="text-[#00A8E1] hover:underline">Terms and Conditions</Link> and <Link to="/privacy" className="text-[#00A8E1] hover:underline">Privacy Policy</Link>.
                </Label>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
       <aside className="w-64 bg-gradient-to-b from-[#0051B4] to-[#003A80] text-white p-4 flex flex-col fixed h-full">
        <div className="text-2xl font-bold mb-8 flex items-center">
           <img src="https://placehold.co/40x40/FFFFFF/0051B4?text=FB" alt="FinBank Small Logo" className="mr-2 rounded"/>
           FinBank
        </div>
        <NavigationMenu orientation="vertical" className="space-y-2 flex-grow">
          <NavigationMenuList className="flex flex-col space-y-1 w-full">
            <NavigationMenuItem className="w-full">
              <Link to="/dashboard" className={navigationMenuTriggerStyle() + " hover:bg-[#007AB5] hover:text-white w-full justify-start"}>
                <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link to="/accounts-details" className={navigationMenuTriggerStyle() + " hover:bg-[#007AB5] hover:text-white w-full justify-start"}>
                <Landmark className="mr-2 h-5 w-5" /> Accounts
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link to="/cards" className={navigationMenuTriggerStyle() + " hover:bg-[#007AB5] hover:text-white w-full justify-start"}>
                <CreditCard className="mr-2 h-5 w-5" /> Cards
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link to="/payments" className={navigationMenuTriggerStyle() + " hover:bg-[#007AB5] hover:text-white w-full justify-start"}>
                <DollarSign className="mr-2 h-5 w-5" /> Payments
              </Link>
            </NavigationMenuItem>
             <NavigationMenuItem className="w-full">
              <Link to="/investments" className={navigationMenuTriggerStyle() + " hover:bg-[#007AB5] hover:text-white w-full justify-start"}>
                <TrendingUp className="mr-2 h-5 w-5" /> Investments
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem className="w-full">
              <Link to="/joint-account-application" className={navigationMenuTriggerStyle() + " bg-[#00A8E1] text-white hover:bg-[#007AB5] w-full justify-start"}>
                <Users className="mr-2 h-5 w-5" /> Joint Account
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
         <div className="mt-auto">
           <Link to="/settings" className={navigationMenuTriggerStyle() + " hover:bg-[#007AB5] hover:text-white w-full justify-start"}>
                <Settings className="mr-2 h-5 w-5" /> Settings
            </Link>
             <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#007AB5] hover:text-white mt-2" onClick={() => navigate('/login')}>
                <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#0051B4]">Joint Account Application</h1>
          <p className="text-gray-600">Follow the steps below to complete your application.</p>
        </header>
        
        <GuidedFlowStepIndicator steps={steps} className="mb-8 bg-white p-4 rounded-lg shadow" />
        <Progress value={applicationProgress} className="mb-8 h-3 [&>div]:bg-[#00A8E1]" />

        <div className="max-w-3xl mx-auto">
          {renderStepContent()}
        </div>

        <div className="mt-10 flex justify-between max-w-3xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => { if (currentStep > 1) setCurrentStep(currentStep - 1); setApplicationProgress((currentStep-1)*20);}} 
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          {/* For steps not using react-hook-form's submit */}
          {currentStep !== 2 && (
            <Button 
              onClick={handleNextStep} 
              className="bg-[#00A8E1] hover:bg-[#007AB5] text-white"
              disabled={(currentStep === 5 && (!form.formState.isValid && !form.getValues('terms1') /* Placeholder for checkbox state */ ))} // Example disable condition
            >
              {currentStep === steps.length ? 'Submit Application' : 'Next Step'} <ShieldCheck className="ml-2 h-5 w-5" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default JointAccountApplicationPage;