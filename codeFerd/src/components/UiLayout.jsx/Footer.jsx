const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-x-hidden">
      <small className="font-roboto lg:col-span-3 lg:text-center lg:mb-4 tracking-wider leading-14">
        <p className="text-sm lg:text-2xl">
          Designed and Developed by <a href="#" className="text-secondary">Me</a>
        </p>
        <p className="text-sm lg:text-2xl">
          © {currentYear} Ashonibare Ferdinard. All rights reserved.
        </p>
      </small>
    </footer>
  )
}

export default Footer