const Footer = () => {
    return(
        <footer className="bg-indigo-300 rounded-lg shadow m-4 dark:bg-indigo-300">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-black-500 sm:text-center dark:text-black">&copy; 2024 Your Company. All Rights Reserved.</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
                    <li>
                        <a href="#" className="dark:text-black hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="dark:text-black hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="dark:text-black hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="dark:text-black hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;