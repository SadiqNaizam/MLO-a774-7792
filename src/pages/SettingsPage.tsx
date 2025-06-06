import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { UserCog, Lock, Bell, Palette, Trash2, LogOut, LayoutDashboard, Landmark, Users, Settings as SettingsIcon, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});
type ProfileFormValues = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
    currentPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match",
    path: ["confirmPassword"],
});
type PasswordFormValues = z.infer<typeof passwordSchema>;


const SettingsPage = () => {
  console.log('SettingsPage loaded');
  const navigate = useNavigate();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: "John Doe", email: "john.doe@example.com", phoneNumber: "", address: "" }
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" }
  });
  
  const onProfileSubmit = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
    alert("Profile updated successfully!");
  };

  const onPasswordSubmit = (data: PasswordFormValues) => {
    console.log("Password change requested for:", data.currentPassword.substring(0,1) + "****"); // Don't log actual passwords
    alert("Password change request submitted!");
    passwordForm.reset();
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
              <Link to="/joint-account-application" className={navigationMenuTriggerStyle() + " hover:bg-[#007AB5] hover:text-white w-full justify-start"}>
                <Users className="mr-2 h-5 w-5" /> Joint Account
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
         <div className="mt-auto">
           <Link to="/settings" className={navigationMenuTriggerStyle() + " bg-[#00A8E1] text-white hover:bg-[#007AB5] w-full justify-start"}>
                <SettingsIcon className="mr-2 h-5 w-5" /> Settings
            </Link>
             <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#007AB5] hover:text-white mt-2" onClick={() => navigate('/login')}>
                <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#0051B4]">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings.</p>
        </header>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-gray-200 p-1 rounded-lg">
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#00A8E1] data-[state=active]:text-white"><UserCog className="mr-2 h-5 w-5 inline-block"/> Profile</TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-[#00A8E1] data-[state=active]:text-white"><Lock className="mr-2 h-5 w-5 inline-block"/> Security</TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[#00A8E1] data-[state=active]:text-white"><Bell className="mr-2 h-5 w-5 inline-block"/> Notifications</TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-[#00A8E1] data-[state=active]:text-white"><Palette className="mr-2 h-5 w-5 inline-block"/> Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#0051B4]">Personal Information</CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
              </CardHeader>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                  <CardContent className="space-y-6">
                    <FormField control={profileForm.control} name="fullName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                     <FormField control={profileForm.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl><Input type="email" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={profileForm.control} name="phoneNumber" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl><Input type="tel" {...field} placeholder="(123) 456-7890" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                     <FormField control={profileForm.control} name="address" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl><Input {...field} placeholder="123 Main St, Anytown, USA" /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="bg-[#00A8E1] hover:bg-[#007AB5]">Save Changes</Button>
                  </CardFooter>
                </form>
              </Form>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#0051B4]">Security Settings</CardTitle>
                <CardDescription>Manage your password, MFA, and active sessions.</CardDescription>
              </CardHeader>
               <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                  <CardContent className="space-y-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="font-semibold">Change Password</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                           <FormField control={passwordForm.control} name="currentPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={passwordForm.control} name="newPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={passwordForm.control} name="confirmPassword" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl><Input type="password" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <Button type="submit" className="bg-[#00A8E1] hover:bg-[#007AB5]">Update Password</Button>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="font-semibold">Two-Factor Authentication (MFA)</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="mfa-switch" className="flex flex-col space-y-1">
                              <span>Enable MFA</span>
                              <span className="font-normal leading-snug text-muted-foreground">
                                Enhance your account security using an authenticator app.
                              </span>
                            </Label>
                            <Switch id="mfa-switch" />
                          </div>
                          <Button variant="outline" disabled>Configure Authenticator App</Button>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="font-semibold">Active Sessions</AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4">
                          <p className="text-sm text-gray-600">Manage devices logged into your account.</p>
                          {/* Placeholder for active sessions list */}
                          <div className="p-3 bg-gray-50 rounded-md">
                            <p className="font-medium">Chrome on Windows - Current Session</p>
                            <p className="text-xs text-gray-500">New York, USA (Approx. location)</p>
                          </div>
                           <div className="p-3 bg-gray-50 rounded-md">
                            <p className="font-medium">Safari on iPhone</p>
                            <p className="text-xs text-gray-500">Last active: 2 days ago</p>
                          </div>
                          <Button variant="destructive" className="text-sm">
                            <LogOut className="mr-2 h-4 w-4" /> Log out all other sessions
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </form>
               </Form>
            </Card>
             <Card className="mt-6 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions related to your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive" className="w-full md:w-auto">
                        <Trash2 className="mr-2 h-4 w-4" /> Close Account
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Closing your account will permanently delete all associated data.</p>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#0051B4]">Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="email-notifications" className="font-semibold">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates via email for transactions and news.</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="sms-notifications" className="font-semibold">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Get urgent alerts and security codes via SMS.</p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="push-notifications" className="font-semibold">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Enable app notifications for real-time updates.</p>
                  </div>
                  <Switch id="push-notifications" defaultChecked/>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="advanced-notifications">
                        <AccordionTrigger className="font-semibold text-md">Advanced Notification Settings</AccordionTrigger>
                        <AccordionContent className="space-y-4 p-4 border rounded-lg mt-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="large-transactions">Notify for large transactions (over $1000)</Label>
                                <Switch id="large-transactions" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="login-alerts">Notify on new device login</Label>
                                <Switch id="login-alerts" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                                <Switch id="newsletter" />
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00A8E1] hover:bg-[#007AB5]">Save Notification Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#0051B4]">Appearance & Customization</CardTitle>
                <CardDescription>Personalize your dashboard experience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <Label htmlFor="theme-select" className="font-semibold">Theme</Label>
                        <p className="text-sm text-gray-500">Choose your preferred color theme.</p>
                    </div>
                    <Select defaultValue="system">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System Default</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="p-4 border rounded-lg">
                    <Label className="font-semibold">Dashboard Widgets</Label>
                    <p className="text-sm text-gray-500 mb-3">Customize which widgets are visible on your dashboard.</p>
                    {/* Placeholder for widget customization */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="widget-overview">Financial Overview</Label>
                            <Switch id="widget-overview" defaultChecked/>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="widget-spending">Spending Chart</Label>
                            <Switch id="widget-spending" defaultChecked/>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="widget-savings">Savings Chart</Label>
                            <Switch id="widget-savings" />
                        </div>
                         <div className="flex items-center justify-between">
                            <Label htmlFor="widget-activity">Recent Activity</Label>
                            <Switch id="widget-activity" defaultChecked/>
                        </div>
                    </div>
                </div>
                 <div className="p-4 border rounded-lg">
                    <Label htmlFor="language-select" className="font-semibold">Language</Label>
                    <p className="text-sm text-gray-500 mb-2">Select your preferred language for the application.</p>
                    <Select defaultValue="en-US">
                        <SelectTrigger className="w-full md:w-[240px]">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en-US">English (United States)</SelectItem>
                            <SelectItem value="en-GB">English (United Kingdom)</SelectItem>
                            <SelectItem value="es-ES">Español (España)</SelectItem>
                            <SelectItem value="fr-FR">Français (France)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-[#00A8E1] hover:bg-[#007AB5]">Save Appearance Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SettingsPage;