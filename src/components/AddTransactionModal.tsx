import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { addTransaction } from '@/services/transactionsService'
import { useDispatch } from 'react-redux'
import { setDoughnutData, setToggleRefresh } from '@/features/userDataSlice'
import { toast } from 'sonner'
import type { TrasactionListType } from '@/types'


const AddTransactionModal = () => {
    const userId = sessionStorage.getItem("userId")
    const dispatch = useDispatch()
    // console.log("userID", userId);

    const [transactionData, setTransactionData] = useState<TrasactionListType>({
        title: "",
        category: "",
        date: "",
        amount: 0
    })

    const [open, setOpen] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setTransactionData((prev: TrasactionListType) => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }
    // console.log("transactionData", transactionData);
    const handleSubmit = async () => {
        for (const value of Object.values(transactionData)) {
            if (!value) return alert("Fill All The Fields");
        }

        const response = await addTransaction({
            title: transactionData.title,
            category: transactionData.category,
            date: transactionData.date,
            amount: Number(transactionData.amount)
        }, userId);
        if (response.success) {
            setOpen(false)
            toast.success(`${response.message}`)
            // dispatch(setTransactions(response.data.transaction.transactions))
            dispatch(setToggleRefresh((prev: any) => !prev))
            dispatch(setDoughnutData(response.data.monthlyTransactionsOverview.categories))

            //reset state
            setTransactionData({
                title: "",
                category: "",
                date: "",
                amount: 0
            })
        }
        // console.log("new transaction added", response);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    {/* <Button variant="outline">Open Dialog</Button> */}
                    <button className="bg-blue-500 text-white rounded px-2 py-1 text-sm">
                        + Add Transaction
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Add Transaction</DialogTitle>
                        <DialogDescription>
                            Please fill the all fields to add the transaction
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={transactionData.title} onChange={handleChange} />
                        </Field>
                        <Field>
                            <Label htmlFor="category">Category</Label>
                            <Select onValueChange={(val) => setTransactionData((prev) => ({ ...prev, category: val }))} name='category'>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel></SelectLabel>
                                        <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                                        <SelectItem value="Housing">Housing</SelectItem>
                                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                                        <SelectItem value="Utilities">Utilities</SelectItem>
                                        <SelectItem value="Transport">Transport</SelectItem>
                                        <SelectItem value="Shopping">Shopping</SelectItem>
                                        <SelectItem value="Income">Income</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" name="date" value={transactionData.date} onChange={handleChange} type='date' />
                        </Field>
                        <Field>
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" name="amount" value={transactionData.amount} onChange={handleChange} />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button className='bg-blue-500' onClick={handleSubmit}>Add Transaction</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export default AddTransactionModal