const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-x-hidden">
      <small className="font-roboto lg:col-span-3 lg:text-center lg:mb-4 tracking-wider leading-8">
        <p className="text-sm lg:text-xl">
          Codeferd Digital - Web development agency.
        </p>
        <p className="text-sm lg:text-xl">
          (c) {currentYear} Codeferd Digital. All rights reserved.
        </p>
        <p className="text-sm lg:text-base text-myWhite/60">
          Lagos, Nigeria. Working worldwide.
        </p>
      </small>
    </footer>
  )
}

export default Footer
