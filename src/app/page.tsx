import Link from 'next/link'
export default function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen ">
        <div className="font-sans p-10 text-center bg-black text-white font-semibold rounded-2xl">
          <div className="flex justify-between items-center -mt-5 mb-3"></div>
          <form>
            <div className="p-2">
              <label htmlFor="email">Your E-mail: </label>
              <input
                className="border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="email"
                id="email"
                name="email"
                placeholder="Log in with your e-mail"
              />
            </div>
            <div className="p-2">
              <label htmlFor="password">Password:</label>
              <input
                className="border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200"
                type="password"
                id="password"
                name="password"
                placeholder="Type your password"
              />
            </div>
            <div className="p-5 ">
              <button
                className="bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-full mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200"
                type="submit"
                id="loginButton"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
        <div className="text-center">
          <span className="font-semibold">
            Are you a new user? <Link href="/registerPage">Register now!</Link>
          </span>
        </div>
      </div>
    </>
  )
}
