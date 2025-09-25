export function Footer() {
  return (
    <div>
      <footer className=" p-4 bg-white md:p-8 lg:p-10 text-orange-400">
        <div className="mx-auto max-w-screen-xl text-center">
          <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-2xl ">
            The comfort of buying product{" "}
            <span className="text-orange-500 ">in every order</span>.
          </h1>

          <ul className="flex flex-wrap justify-center items-center mb-6 w-auto ">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>

            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Blog
              </a>
            </li>

            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Contact
              </a>
            </li>
          </ul>
          <span className="text-sm text-orange-600 sm:text-center font-extrabold">
            © 2024-2025{" "}
            <a href="#" className="hover:underline">
              SmartBasket™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
