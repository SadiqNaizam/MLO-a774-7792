import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import FinancialOverviewWidget from '@/components/FinancialOverviewWidget';
import InsightfulChart from '@/components/InsightfulChart';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, LayoutDashboard, Users, Landmark, Settings, LogOut, CreditCard, DollarSign, TrendingUp, PlusCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const overviewItems = [
    { title: 'Total Balance', value: '$125,670.80', change: '+2.5%', changeType: 'positive' as 'positive' | 'negative' | 'neutral' },
    { title: 'Monthly Spending', value: '$4,350.20', change: '-1.8%', changeType: 'negative' as 'positive' | 'negative' | 'neutral' },
    { title: 'Savings Goal Progress', value: '$15,000 / $50,000', change: '30%', changeType: 'neutral' as 'positive' | 'negative' | 'neutral' },
  ];

  const spendingData = [
    { name: 'Groceries', value: 1200 },
    { name: 'Utilities', value: 300 },
    { name: 'Transport', value: 250 },
    { name: 'Entertainment', value: 400 },
    { name: 'Healthcare', value: 150 },
    { name: 'Other', value: 600 },
  ];
  
  const savingsData = [
    { name: 'Jan', value: 500 },
    { name: 'Feb', value: 650 },
    { name: 'Mar', value: 800 },
    { name: 'Apr', value: 700 },
    { name: 'May', value: 950 },
  ];


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
              <Link to="/dashboard" className={navigationMenuTriggerStyle() + " bg-[#00A8E1] text-white hover:bg-[#007AB5] w-full justify-start"}>
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
           <Link to="/settings" className={navigationMenuTriggerStyle() + " hover:bg-[#007AB5] hover:text-white w-full justify-start"}>
                <Settings className="mr-2 h-5 w-5" /> Settings
            </Link>
             <Button variant="ghost" className="w-full justify-start text-white hover:bg-[#007AB5] hover:text-white mt-2" onClick={() => navigate('/login')}>
                <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-[#00A8E1] text-[#00A8E1] hover:bg-[#00A8E1] hover:text-white">
                <PlusCircle className="mr-2 h-5 w-5" /> New Transaction
            </Button>
            <Bell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-[#00A8E1]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/support')}>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/login')} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <ScrollArea className="h-[calc(100vh-64px)]"> {/* Adjust height based on header height */}
          <div className="p-6 space-y-6">
            <FinancialOverviewWidget title="Key Financial Snapshot" items={overviewItems} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <InsightfulChart
                title="Monthly Spending Breakdown"
                description="Visualize your expenses by category."
                data={spendingData}
                xAxisKey="name"
                dataKeys={[{ key: 'value', color: '#00A8E1' }]}
                chartType="bar"
              />
              <InsightfulChart
                title="Savings Growth Over Time"
                description="Track your progress towards savings goals."
                data={savingsData}
                xAxisKey="name"
                dataKeys={[{ key: 'value', color: '#0051B4' }]}
                chartType="line" // This component currently renders BarChart, but props allow different types
              />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Overview of your latest transactions and account updates.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for recent activity list */}
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div>
                                <p className="font-medium">Salary Deposit</p>
                                <p className="text-sm text-gray-500">June 1, 2024</p>
                            </div>
                            <p className="text-green-600 font-semibold">+$5,200.00</p>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div>
                                <p className="font-medium">Online Shopping - TechStore</p>
                                <p className="text-sm text-gray-500">May 30, 2024</p>
                            </div>
                            <p className="text-red-600 font-semibold">-$299.99</p>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                            <div>
                                <p className="font-medium">Utility Bill - Electricity</p>
                                <p className="text-sm text-gray-500">May 28, 2024</p>
                            </div>
                            <p className="text-red-600 font-semibold">-$75.50</p>
                        </li>
                    </ul>
                    <Button variant="link" className="mt-4 text-[#00A8E1]">View All Activity</Button>
                </CardContent>
            </Card>

            {/* Quick Actions Section */}
            <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-3">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="bg-[#00A8E1] hover:bg-[#007AB5] text-white py-6 text-base">Transfer Funds</Button>
                    <Button className="bg-[#00A8E1] hover:bg-[#007AB5] text-white py-6 text-base">Pay Bills</Button>
                    <Button className="bg-[#00A8E1] hover:bg-[#007AB5] text-white py-6 text-base">Deposit Check</Button>
                    <Button className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-6 text-base">Find ATM/Branch</Button>
                </div>
            </section>
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default DashboardPage;