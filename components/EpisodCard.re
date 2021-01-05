open Belt;
open Utils;

let defaultImage = "https://image.ausha.co/y16tcxiM957ICPP3MtB2HvmB9ot3e5di2OiKSMMd_400x400.jpeg";

[@react.component]
let make =
    (~episod as {name, image_url, published_at, public_id}: Api.Podcast.t) => {
  <Next.Link href={j|/episode/$public_id|j}>
    <a
      className="max-w-sm rounded-xl overflow-hidden flex flex-col items-center bg-gray-200 shadow-2xl hover:opacity-75">
      <img
        className="object-contain"
        src={image_url->Option.getWithDefault(defaultImage)}
      />
      <div className="flex-auto p-4">
        <div className="text-gray-500 capitalize font-display">
          {published_at->Api.IsoDate.toMonthAndYearShortString->s}
        </div>
        <div className="text-gray-700"> name->s </div>
      </div>
    </a>
  </Next.Link>;
};
