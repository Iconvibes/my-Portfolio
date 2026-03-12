import Navigation from "../Navigation"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-myWhite/10 bg-myBlack/70 backdrop-blur">
      <div className="py-4">
        <Navigation />
      </div>
    </header>
  )
}

export default Header
