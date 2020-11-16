/* Declaration of the binding. */

type response;

type options('body);

type method = [ | `GET | `POST];

type redirect = [ | `follow | `error | `manual];

[@obj]
// These properties are part of the Fetch Standard
external options:
  (
    ~method: method=?, // 'GET',
    ~headers: Js.t({..})=?, // {},            // Request headers. format is the identical to that accepted by the Headers constructor (see below)
    ~body: 'body=?, // null,            // Request body. can be null, a string, a Buffer, a Blob, or a Node.js Readable stream
    ~redirect: redirect=?, // 'follow',     // Set to `manual` to extract redirect headers, `error` to reject redirect
    //~signal: null,           // Pass an instance of AbortSignal to optionally abort requests
    // The following properties are node-fetch extensions
    ~follow: int=?, // 20,             // maximum redirect count. 0 to not follow redirect
    ~compress: bool=?, //true,         // support gzip/deflate content encoding. false to disable
    ~size: int=?, // 0,                // maximum response body size in bytes. 0 to disable
    // ~agent: null,            // http(s).Agent instance or function that returns an instance (see below)
    ~highWaterMark: int=?, // 16384,   // the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
    ~insecureHTTPParser: bool=?,
    unit
  ) => // false	// Use an insecure HTTP parser that accepts invalid HTTP headers when `true`.
  options('body);

[@bs.module]
external fetch:
  (string, ~options: options('body)=?, unit) => Promise.t(response) =
  "node-fetch";

[@bs.send] external text: response => Promise.t(string) = "text";

[@bs.send] external json: response => Promise.t(Js.Json.t) = "json";
