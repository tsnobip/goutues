open Belt;
open Utils;

let defaultImage = "https://image.ausha.co/y16tcxiM957ICPP3MtB2HvmB9ot3e5di2OiKSMMd_400x400.jpeg";

[@react.component]
let make = (~episod as {name, image_url, published_at}: Api.Podcast.t) => {
  <div
    className="max-w-sm rounded-3xl overflow-hidden m-5 flex flex-col items-center bg-yellow relative">
    <img
      className="object-contain"
      src={image_url->Option.getWithDefault(defaultImage)}
    />
    <div
      className="absolute top-0 right-0 bg-yellow rounded-full text-brown m-3 p-3 w-12 h-12 leading-none text-center inline-block align-middle">
      {published_at->Api.IsoDate.toDayAndMonthShortString->s}
    </div>
    <div className="text-center p-2 text-brown flex-auto"> name->s </div>
  </div>;
};
