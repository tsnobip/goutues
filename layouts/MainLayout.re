module Link = Next.Link;

module Icon = {
  [@react.component]
  let make = (~link as href, ~children) => {
    <a className="px-1 opacity-75 hover:opacity-50" target="_blank" href>
      children
    </a>;
  };
};

module Navigation = {
  [@react.component]
  let make = () =>
    <nav
      className="px-2 py-1 flex border-b-4 mb-10 border-yellow justify-between items-center text-lg">
      <Link href="/">
        <a className="flex items-center">
          <span
            className="text-brown text-4xl md:text-5xl font-semibold font-logo">
            {React.string({js|Goutues|js})}
          </span>
        </a>
      </Link>
      <div className="flex items-end">
        <div className="px-3 font-display hover:opacity-75">
          <Link href="/episodes">
            <a> {React.string({js|Épisodes|js})} </a>
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <Icon link="https://facebook.com/goutues">
            <img className="h-6" src="/static/ri-facebook-circle-line.svg" />
          </Icon>
          <Icon link="https://www.instagram.com/goutues/">
            <img className="h-6" src="/static/ri-instagram-line.svg" />
          </Icon>
          <Icon link="https://smartlink.ausha.co/goutues">
            <img className="w-16" src="/static/ausha.svg" />
          </Icon>
        </div>
      </div>
    </nav>;
};

[@react.component]
let make = (~children) => {
  let minWidth = ReactDOMRe.Style.make(~minWidth="20rem", ());
  <div style=minWidth className="flex lg:justify-center">
    <div className="max-w-5xl w-full lg:w-3/4 text-gray-700 font-base">
      <Navigation />
      <main className="my-4"> children </main>
    </div>
  </div>;
};
