type props = {show: JSON.t}
let default: props => React.element
let siteName: string
let getServerSideProps: Next.GetServerSideProps.t<props, {.}>
