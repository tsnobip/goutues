module Link = Next.Link;

module Navigation = {
  [@react.component]
  let make = () =>
    <nav
      className="p-2 h-12 flex border-b border-gray-200 justify-between items-center text-m">
      <Link href="/">
        <a className="flex items-center w-1/3">
          <span
            className="text-orange-800 ml-2 text-4xl font-semibold font-wildy">
            {React.string({js|Goutues|js})}
          </span>
        </a>
      </Link>
      <div className="flex w-2/3 justify-end">
        <Link href="/episodes">
          <a className="px-3"> {React.string({js|Épisodes|js})} </a>
        </Link>
        <div className="flex flex-row items-center">
          <a
            className="px-1"
            target="_blank"
            href="https://facebook.com/goutues">
            <img className="h-6" src="/static/ri-facebook-circle-line.svg" />
          </a>
          <a
            className="px-1"
            target="_blank"
            href="https://www.instagram.com/goutues/">
            <img
              target="_blank"
              href="instagram.com"
              className="h-6"
              src="/static/ri-instagram-line.svg"
            />
          </a>
          <a
            target="_blank"
            className="px-1"
            href="https://smartlink.ausha.co/goutues">
            <img className="w-16" src="/static/ausha.svg" />
          </a>
        </div>
      </div>
    </nav>;
};

[@react.component]
let make = (~children) => {
  let minWidth = ReactDOMRe.Style.make(~minWidth="20rem", ());
  <div style=minWidth className="flex lg:justify-center">
    <div className="max-w-5xl w-full lg:w-3/4 text-gray-900 font-base">
      <Navigation />
      <main className="mt-4 mx-4"> children </main>
    </div>
  </div>;
};
