import Header from "../components/header";
import Footer from "../components/footer";

const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow p-4 md:p-6 lg:p-8 bg-gray-50">
                <section className="container mx-auto">
                    <h1 className="text-xl sm:text-xl md:text-2xl lg:text-2xl text-center font-semibold text-gray-800 mb-6">
                        Welcome to the Dashboard
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-medium text-gray-700">Overview</h2>
                            <p className="text-gray-500 mt-2">This is the small React Project with Mobile Resposnsive... Project Containes Users Data.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-medium text-gray-700">Notifications</h2>
                            <p className="text-gray-500 mt-2">Recent system Notifications and also give the Users Notifications.</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-xl font-medium text-gray-700">Reports</h2>
                            <p className="text-gray-500 mt-2">Access your latest reports and analytics about the Users Data.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
