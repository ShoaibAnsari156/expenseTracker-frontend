import AddTransactionModal from "./AddTransactionModal"
import ProfileCard from "./ProfileCard"


const Header = () => {

    return (
        <div>
            <header className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Expense Tracker Dashboard</h1>
                <div className="flex items-center gap-2">
                    <AddTransactionModal />
                    <ProfileCard />
                </div>
            </header>
        </div>
    )
}

export default Header