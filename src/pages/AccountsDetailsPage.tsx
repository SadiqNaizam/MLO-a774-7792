import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar } from "@/components/ui/calendar"; // Using Calendar directly
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"; // For DatePicker like experience
import { Filter, Search, Download, FileText, ChevronDown, CalendarIcon, LayoutDashboard, Landmark, Users, Settings, LogOut, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { format } from "date-fns";

// Mock DatePicker component structure (usually you'd import this if it's a composed component)
interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}
const DatePickerComponent: React.FC<DatePickerProps> = ({ date, setDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-[240px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};


interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  balance: number;
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '2024-05-28', description: 'Online Purchase - Amazon', amount: -75.99, type: 'debit', balance: 10250.75 },
  { id: '2', date: '2024-05-27', description: 'Salary Deposit - Acme Corp', amount: 2500.00, type: 'credit', balance: 10326.74 },
  { id: '3', date: '2024-05-25', description: 'ATM Withdrawal - Main Street', amount: -100.00, type: 'debit', balance: 7826.74 },
  { id: '4', date: '2024-05-22', description: 'Restaurant - The Italian Place', amount: -45.50, type: 'debit', balance: 7926.74 },
  { id: '5', date: '2024-05-20', description: 'Transfer from Savings', amount: 500.00, type: 'credit', balance: 7972.24 },
];

const AccountsDetailsPage = () => {
  const { accountId } = useParams<{ accountId: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();

  console.log('AccountsDetailsPage loaded for account:', accountId || 'Generic Account');

  useEffect(() => {
    // Filter logic based on searchTerm, filterType, dateFrom, dateTo
    let filtered = mockTransactions;
    if (searchTerm) {
      filtered = filtered.filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }
    if (dateFrom) {
        filtered = filtered.filter(t => new Date(t.date) >= dateFrom);
    }
    if (dateTo) {
        filtered = filtered.filter(t => new Date(t.date) <= dateTo);
    }
    setTransactions(filtered);
  }, [searchTerm, filterType, dateFrom, dateTo]);

  const accountName = accountId ? `Account ${accountId}` : "Primary Checking Account"; // Placeholder
  const currentBalance = "$10,250.75"; // Placeholder
  const availableBalance = "$10,000.00"; // Placeholder
  const accountNumber = "XXXX-XXXX-XXXX-1234"; // Placeholder

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation - Re-using Dashboard's sidebar style for consistency */}
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
              <Link to="/accounts-details" className={navigationMenuTriggerStyle() + " bg-[#00A8E1] text-white hover:bg-[#007AB5] w-full justify-start"}>
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

      <main className="flex-1 ml-64 p-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/dashboard">Dashboard</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/accounts-details">Accounts</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{accountName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card className="mb-6 shadow-lg">
          <CardHeader className="bg-gray-50 border-b">
            <CardTitle className="text-xl text-[#0051B4]">{accountName}</CardTitle>
            <CardDescription>Account Number: {accountNumber}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-2xl font-semibold text-gray-800">{currentBalance}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-2xl font-semibold text-gray-800">{availableBalance}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t pt-4">
            <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> View Statements</Button>
            <Button className="bg-[#00A8E1] hover:bg-[#007AB5]">Make a Transfer</Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-[#0051B4]">Transaction History</CardTitle>
            <CardDescription>View and filter your recent transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
              <div className="relative flex-grow w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search transactions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="debit">Debits</SelectItem>
                  <SelectItem value="credit">Credits</SelectItem>
                </SelectContent>
              </Select>
              <DatePickerComponent date={dateFrom} setDate={setDateFrom} />
              <DatePickerComponent date={dateTo} setDate={setDateTo} />
              <Button variant="outline" onClick={() => { /* Implement download logic */ }}>
                <Download className="mr-2 h-4 w-4" /> Download CSV
              </Button>
            </div>

            <Table>
              <TableCaption>A list of your recent transactions.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={`text-right font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">${transaction.balance.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                {transactions.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center text-gray-500 py-8">No transactions found matching your criteria.</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AccountsDetailsPage;