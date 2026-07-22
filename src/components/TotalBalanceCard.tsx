// import { Ellipsis, HandCoins, Wallet } from 'lucide-react'

import { Wallet } from "lucide-react"

// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Field, FieldGroup } from "@/components/ui/field"
// import { Button } from "@/components/ui/button"
// import { useState } from 'react'
// import { addBalance } from '@/services/addBalanceService'
// import { useSelector } from 'react-redux'
// import { toast } from 'sonner'

const TotalBalanceCard = ({ currentBalance }: any) => {
    // const [balance, setBalance] = useState("");
    // const [open, setOpen] = useState(false);
    // const userId = useSelector((state: any) => state.user.userId);

    // const handleSubmit = async () => {
    //     try {
    //         if (!balance) return alert("Balance cannot be empty");
    //         const response = await addBalance(userId, parseFloat(balance));
    //         // console.log("response", response);
    //         setAllAmounts(response.data)
    //         if (response.success) {
    //             setOpen(false);
    //             toast.success("Balance Added Successfully")
    //         } else {
    //             toast.error("Failed to add balance")
    //         }
    //     }
    //     catch (error) {
    //         toast.error("An error occurred while adding balance")
    //         console.log("Error in adding Balance", error)
    //     }
    // }

    return (
        <div
            className="flex  justify-between p-3 bg-white rounded-md shadow-sm"
        >
            <Wallet className="w-7 h-7 bg-blue-200 text-blue-800 p-1 rounded" />

            <div className="flex-1 ml-2">
                <p className="text-lg text-gray-500">Total Balance</p>
                <p className="font-bold text-xl">₹ {currentBalance.totalBalance}</p>
            </div>
            {/* <HandCoins className="w-7 h-7 bg-blue-200 text-blue-800 p-1 rounded" /> */}
            {/* <Dialog open={open} onOpenChange={setOpen}>
                <form>
                    <DialogTrigger asChild>
                        <button >
                            <Ellipsis className="w-7 h-7 bg-blue-200 text-blue-800 p-1 rounded" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                        <DialogHeader>
                            <DialogTitle>Add Balance</DialogTitle>
                            <DialogDescription>
                                This Balance Treated as a final available balance
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="balance">Add Balance</Label>
                                <Input id="balance" name="balance" inputMode='numeric' type='number' value={balance} onChange={(e) => setBalance(e.target.value)} min="0" />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button className='bg-blue-500' onClick={handleSubmit}>Add Balance</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog> */}
        </div>
    )
}

export default TotalBalanceCard