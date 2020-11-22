open Belt;
open Utils;

let defaultImage = "https://image.ausha.co/y16tcxiM957ICPP3MtB2HvmB9ot3e5di2OiKSMMd_400x400.jpeg";

[@react.component]
let make = (~episod as {name, image_url, published_at}: Api.Podcast.t) => {
  <div
    className="max-w-sm rounded-xl overflow-hidden m-5 flex flex-col items-center bg-gray-200 shadow-xl">
    <img
      className="object-contain"
      src={image_url->Option.getWithDefault(defaultImage)}
    />
    <div className="flex-auto p-2">
      <div className="text-gray-500 capitalize">
        {published_at->Api.IsoDate.toMonthAndYearShortString->s}
      </div>
      <div className="text-gray-700"> name->s </div>
    </div>
  </div>;
};
