

import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Decco from "decco/src/Decco.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Js_json from "bs-platform/lib/es6/js_json.js";
import * as $$Promise from "reason-promise/src/js/promise.js";
import * as Belt_Array from "bs-platform/lib/es6/belt_Array.js";
import * as NodeFetch from "node-fetch";
import * as Belt_Option from "bs-platform/lib/es6/belt_Option.js";
import * as Belt_Result from "bs-platform/lib/es6/belt_Result.js";

var baseUrl = "https://developers.ausha.co";

var showId = "32899";

function get(url) {
  return NodeFetch(url, {
              headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: "Bearer " + process.env.AUSHA_TOKEN
              }
            });
}

function t_decode(json) {
  return Belt_Result.flatMap(Decco.stringFromJson(json), (function (v) {
                var date = new Date(v);
                if (isNaN(date.getTime())) {
                  return Decco.error(undefined, "Not a valid date", json);
                } else {
                  return {
                          TAG: 0,
                          _0: date,
                          [Symbol.for("name")]: "Ok"
                        };
                }
              }));
}

function t_encode(date) {
  return Decco.stringToJson(date.toISOString());
}

var codec = [
  t_encode,
  t_decode
];

var IsoDate = {
  t_decode: t_decode,
  t_encode: t_encode,
  codec: codec
};

function pagination_encode(v) {
  return Js_dict.fromArray([
              [
                "total",
                Decco.intToJson(v.total)
              ],
              [
                "count",
                Decco.intToJson(v.count)
              ],
              [
                "per_page",
                Decco.intToJson(v.per_page)
              ],
              [
                "current_page",
                Decco.intToJson(v.current_page)
              ],
              [
                "total_pages",
                Decco.intToJson(v.total_pages)
              ]
            ]);
}

function pagination_decode(v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var dict$1 = dict._0;
  var total = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "total"), null));
  if (total.TAG) {
    var e = total._0;
    return {
            TAG: 1,
            _0: {
              path: ".total" + e.path,
              message: e.message,
              value: e.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var count = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "count"), null));
  if (count.TAG) {
    var e$1 = count._0;
    return {
            TAG: 1,
            _0: {
              path: ".count" + e$1.path,
              message: e$1.message,
              value: e$1.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var per_page = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "per_page"), null));
  if (per_page.TAG) {
    var e$2 = per_page._0;
    return {
            TAG: 1,
            _0: {
              path: ".per_page" + e$2.path,
              message: e$2.message,
              value: e$2.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var current_page = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "current_page"), null));
  if (current_page.TAG) {
    var e$3 = current_page._0;
    return {
            TAG: 1,
            _0: {
              path: ".current_page" + e$3.path,
              message: e$3.message,
              value: e$3.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var total_pages = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "total_pages"), null));
  if (!total_pages.TAG) {
    return {
            TAG: 0,
            _0: {
              total: total._0,
              count: count._0,
              per_page: per_page._0,
              current_page: current_page._0,
              total_pages: total_pages._0
            },
            [Symbol.for("name")]: "Ok"
          };
  }
  var e$4 = total_pages._0;
  return {
          TAG: 1,
          _0: {
            path: ".total_pages" + e$4.path,
            message: e$4.message,
            value: e$4.value
          },
          [Symbol.for("name")]: "Error"
        };
}

function meta_encode(v) {
  return Js_dict.fromArray([[
                "pagination",
                pagination_encode(v.pagination)
              ]]);
}

function meta_decode(v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var pagination = pagination_decode(Belt_Option.getWithDefault(Js_dict.get(dict._0, "pagination"), null));
  if (!pagination.TAG) {
    return {
            TAG: 0,
            _0: {
              pagination: pagination._0
            },
            [Symbol.for("name")]: "Ok"
          };
  }
  var e = pagination._0;
  return {
          TAG: 1,
          _0: {
            path: ".pagination" + e.path,
            message: e.message,
            value: e.value
          },
          [Symbol.for("name")]: "Error"
        };
}

function links_encode(v) {
  return Js_dict.fromArray([
              [
                "self",
                Decco.stringToJson(v.self)
              ],
              [
                "first",
                Decco.stringToJson(v.first)
              ],
              [
                "prev",
                Decco.optionToJson(Decco.stringToJson, v.prev)
              ],
              [
                "next",
                Decco.optionToJson(Decco.stringToJson, v.next)
              ],
              [
                "last",
                Decco.stringToJson(v.last)
              ]
            ]);
}

function links_decode(v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var dict$1 = dict._0;
  var self = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "self"), null));
  if (self.TAG) {
    var e = self._0;
    return {
            TAG: 1,
            _0: {
              path: ".self" + e.path,
              message: e.message,
              value: e.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var first = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "first"), null));
  if (first.TAG) {
    var e$1 = first._0;
    return {
            TAG: 1,
            _0: {
              path: ".first" + e$1.path,
              message: e$1.message,
              value: e$1.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var prev = Decco.optionFromJson(Decco.stringFromJson, Belt_Option.getWithDefault(Js_dict.get(dict$1, "prev"), null));
  if (prev.TAG) {
    var e$2 = prev._0;
    return {
            TAG: 1,
            _0: {
              path: ".prev" + e$2.path,
              message: e$2.message,
              value: e$2.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var next = Decco.optionFromJson(Decco.stringFromJson, Belt_Option.getWithDefault(Js_dict.get(dict$1, "next"), null));
  if (next.TAG) {
    var e$3 = next._0;
    return {
            TAG: 1,
            _0: {
              path: ".next" + e$3.path,
              message: e$3.message,
              value: e$3.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var last = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "last"), null));
  if (!last.TAG) {
    return {
            TAG: 0,
            _0: {
              self: self._0,
              first: first._0,
              prev: prev._0,
              next: next._0,
              last: last._0
            },
            [Symbol.for("name")]: "Ok"
          };
  }
  var e$4 = last._0;
  return {
          TAG: 1,
          _0: {
            path: ".last" + e$4.path,
            message: e$4.message,
            value: e$4.value
          },
          [Symbol.for("name")]: "Error"
        };
}

function data_encode(encoder_a, v) {
  return Js_dict.fromArray([
              [
                "data",
                Decco.arrayToJson(encoder_a, v.data)
              ],
              [
                "meta",
                meta_encode(v.meta)
              ],
              [
                "links",
                links_encode(v.links)
              ]
            ]);
}

function data_decode(decoder_a, v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var dict$1 = dict._0;
  var data = Decco.arrayFromJson(decoder_a, Belt_Option.getWithDefault(Js_dict.get(dict$1, "data"), null));
  if (data.TAG) {
    var e = data._0;
    return {
            TAG: 1,
            _0: {
              path: ".data" + e.path,
              message: e.message,
              value: e.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var meta = meta_decode(Belt_Option.getWithDefault(Js_dict.get(dict$1, "meta"), null));
  if (meta.TAG) {
    var e$1 = meta._0;
    return {
            TAG: 1,
            _0: {
              path: ".meta" + e$1.path,
              message: e$1.message,
              value: e$1.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var links = links_decode(Belt_Option.getWithDefault(Js_dict.get(dict$1, "links"), null));
  if (!links.TAG) {
    return {
            TAG: 0,
            _0: {
              data: data._0,
              meta: meta._0,
              links: links._0
            },
            [Symbol.for("name")]: "Ok"
          };
  }
  var e$2 = links._0;
  return {
          TAG: 1,
          _0: {
            path: ".links" + e$2.path,
            message: e$2.message,
            value: e$2.value
          },
          [Symbol.for("name")]: "Error"
        };
}

function simpleData_encode(encoder_a, v) {
  return Js_dict.fromArray([[
                "data",
                Curry._1(encoder_a, v.data)
              ]]);
}

function simpleData_decode(decoder_a, v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var data = Curry._1(decoder_a, Belt_Option.getWithDefault(Js_dict.get(dict._0, "data"), null));
  if (!data.TAG) {
    return {
            TAG: 0,
            _0: {
              data: data._0
            },
            [Symbol.for("name")]: "Ok"
          };
  }
  var e = data._0;
  return {
          TAG: 1,
          _0: {
            path: ".data" + e.path,
            message: e.message,
            value: e.value
          },
          [Symbol.for("name")]: "Error"
        };
}

function arrayData_encode(encoder_a, v) {
  return simpleData_encode((function (param) {
                return Decco.arrayToJson(encoder_a, param);
              }), v);
}

function arrayData_decode(decoder_a, v) {
  return simpleData_decode((function (param) {
                return Decco.arrayFromJson(decoder_a, param);
              }), v);
}

var Common = {
  pagination_encode: pagination_encode,
  pagination_decode: pagination_decode,
  meta_encode: meta_encode,
  meta_decode: meta_decode,
  links_encode: links_encode,
  links_decode: links_decode,
  data_encode: data_encode,
  data_decode: data_decode,
  simpleData_encode: simpleData_encode,
  simpleData_decode: simpleData_decode,
  arrayData_encode: arrayData_encode,
  arrayData_decode: arrayData_decode
};

function t_decode$1(json) {
  return Belt_Result.flatMap(Decco.stringFromJson(json), (function (param) {
                switch (param) {
                  case "bonus" :
                      return {
                              TAG: 0,
                              _0: /* Bonus */1,
                              [Symbol.for("name")]: "Ok"
                            };
                  case "full" :
                      return {
                              TAG: 0,
                              _0: /* Full */0,
                              [Symbol.for("name")]: "Ok"
                            };
                  case "trailer" :
                      return {
                              TAG: 0,
                              _0: /* Trailer */2,
                              [Symbol.for("name")]: "Ok"
                            };
                  default:
                    return Decco.error(undefined, "not a valid podcast type", json);
                }
              }));
}

function t_encode$1(t) {
  var tmp;
  switch (t) {
    case /* Full */0 :
        tmp = "full";
        break;
    case /* Bonus */1 :
        tmp = "bonus";
        break;
    case /* Trailer */2 :
        tmp = "trailer";
        break;
    
  }
  return Decco.stringToJson(tmp);
}

var codec$1 = [
  t_encode$1,
  t_decode$1
];

var Type = {
  t_decode: t_decode$1,
  t_encode: t_encode$1,
  codec: codec$1
};

function t_decode$2(json) {
  return Belt_Result.flatMap(Decco.stringFromJson(json), (function (param) {
                switch (param) {
                  case "private" :
                      return {
                              TAG: 0,
                              _0: /* Private */1,
                              [Symbol.for("name")]: "Ok"
                            };
                  case "public" :
                      return {
                              TAG: 0,
                              _0: /* Public */0,
                              [Symbol.for("name")]: "Ok"
                            };
                  case "unlisted" :
                      return {
                              TAG: 0,
                              _0: /* Unlisted */2,
                              [Symbol.for("name")]: "Ok"
                            };
                  default:
                    return Decco.error(undefined, "not a valid podcast privacy", json);
                }
              }));
}

function t_encode$2(t) {
  var tmp;
  switch (t) {
    case /* Public */0 :
        tmp = "public";
        break;
    case /* Private */1 :
        tmp = "private";
        break;
    case /* Unlisted */2 :
        tmp = "unlisted";
        break;
    
  }
  return Decco.stringToJson(tmp);
}

var codec$2 = [
  t_encode$2,
  t_decode$2
];

var Privacy = {
  t_decode: t_decode$2,
  t_encode: t_encode$2,
  codec: codec$2
};

function t_decode$3(json) {
  return Belt_Result.flatMap(Decco.stringFromJson(json), (function (param) {
                switch (param) {
                  case "active" :
                      return {
                              TAG: 0,
                              _0: /* Active */2,
                              [Symbol.for("name")]: "Ok"
                            };
                  case "blocked" :
                      return {
                              TAG: 0,
                              _0: /* Blocked */1,
                              [Symbol.for("name")]: "Ok"
                            };
                  case "draft" :
                      return {
                              TAG: 0,
                              _0: /* Draft */0,
                              [Symbol.for("name")]: "Ok"
                            };
                  case "scheduled" :
                      return {
                              TAG: 0,
                              _0: /* Scheduled */3,
                              [Symbol.for("name")]: "Ok"
                            };
                  default:
                    return Decco.error(undefined, "not a valid podcast state", json);
                }
              }));
}

function toString(param) {
  switch (param) {
    case /* Draft */0 :
        return "draft";
    case /* Blocked */1 :
        return "blocked";
    case /* Active */2 :
        return "active";
    case /* Scheduled */3 :
        return "scheduled";
    
  }
}

function t_encode$3(t) {
  return Decco.stringToJson(toString(t));
}

var codec$3 = [
  t_encode$3,
  t_decode$3
];

var State = {
  t_decode: t_decode$3,
  toString: toString,
  t_encode: t_encode$3,
  codec: codec$3
};

function t_decode$4(json) {
  return Belt_Result.flatMap(Decco.stringFromJson(json), (function (param) {
                switch (param) {
                  case "facebook" :
                      return {
                              TAG: 0,
                              _0: /* Facebook */0,
                              [Symbol.for("name")]: "Ok"
                            };
                  case "newsletter" :
                      return {
                              TAG: 0,
                              _0: /* Newsletter */2,
                              [Symbol.for("name")]: "Ok"
                            };
                  case "twitter" :
                      return {
                              TAG: 0,
                              _0: /* Twitter */1,
                              [Symbol.for("name")]: "Ok"
                            };
                  default:
                    return Decco.error(undefined, "not a valid autosharing policy", json);
                }
              }));
}

function t_encode$4(t) {
  var tmp;
  switch (t) {
    case /* Facebook */0 :
        tmp = "facebook";
        break;
    case /* Twitter */1 :
        tmp = "twitter";
        break;
    case /* Newsletter */2 :
        tmp = "newsletter";
        break;
    
  }
  return Decco.stringToJson(tmp);
}

var codec$4 = [
  t_encode$4,
  t_decode$4
];

var AutoSharing = {
  t_decode: t_decode$4,
  t_encode: t_encode$4,
  codec: codec$4
};

function tag_encode(v) {
  return Js_dict.fromArray([
              [
                "id",
                Decco.intToJson(v.id)
              ],
              [
                "slug",
                Decco.stringToJson(v.slug)
              ],
              [
                "name",
                Decco.stringToJson(v.name)
              ]
            ]);
}

function tag_decode(v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var dict$1 = dict._0;
  var id = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "id"), null));
  if (id.TAG) {
    var e = id._0;
    return {
            TAG: 1,
            _0: {
              path: ".id" + e.path,
              message: e.message,
              value: e.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var slug = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "slug"), null));
  if (slug.TAG) {
    var e$1 = slug._0;
    return {
            TAG: 1,
            _0: {
              path: ".slug" + e$1.path,
              message: e$1.message,
              value: e$1.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var name = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "name"), null));
  if (!name.TAG) {
    return {
            TAG: 0,
            _0: {
              id: id._0,
              slug: slug._0,
              name: name._0
            },
            [Symbol.for("name")]: "Ok"
          };
  }
  var e$2 = name._0;
  return {
          TAG: 1,
          _0: {
            path: ".name" + e$2.path,
            message: e$2.message,
            value: e$2.value
          },
          [Symbol.for("name")]: "Error"
        };
}

function file_encode(v) {
  return Js_dict.fromArray([
              [
                "format",
                Decco.stringToJson(v.format)
              ],
              [
                "key",
                Decco.stringToJson(v.key)
              ],
              [
                "mime_type",
                Decco.stringToJson(v.mime_type)
              ],
              [
                "duration",
                Decco.floatToJson(v.duration)
              ]
            ]);
}

function file_decode(v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var dict$1 = dict._0;
  var format = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "format"), null));
  if (format.TAG) {
    var e = format._0;
    return {
            TAG: 1,
            _0: {
              path: ".format" + e.path,
              message: e.message,
              value: e.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var key = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "key"), null));
  if (key.TAG) {
    var e$1 = key._0;
    return {
            TAG: 1,
            _0: {
              path: ".key" + e$1.path,
              message: e$1.message,
              value: e$1.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var mime_type = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "mime_type"), null));
  if (mime_type.TAG) {
    var e$2 = mime_type._0;
    return {
            TAG: 1,
            _0: {
              path: ".mime_type" + e$2.path,
              message: e$2.message,
              value: e$2.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var duration = Decco.floatFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "duration"), null));
  if (!duration.TAG) {
    return {
            TAG: 0,
            _0: {
              format: format._0,
              key: key._0,
              mime_type: mime_type._0,
              duration: duration._0
            },
            [Symbol.for("name")]: "Ok"
          };
  }
  var e$3 = duration._0;
  return {
          TAG: 1,
          _0: {
            path: ".duration" + e$3.path,
            message: e$3.message,
            value: e$3.value
          },
          [Symbol.for("name")]: "Error"
        };
}

function t_encode$5(v) {
  return Js_dict.fromArray([
              [
                "id",
                Decco.intToJson(v.id)
              ],
              [
                "show_id",
                Decco.intToJson(v.show_id)
              ],
              [
                "type",
                t_encode$1(v.type_)
              ],
              [
                "season_id",
                Decco.optionToJson(Decco.intToJson, v.season_id)
              ],
              [
                "name",
                Decco.stringToJson(v.name)
              ],
              [
                "public_id",
                Decco.stringToJson(v.public_id)
              ],
              [
                "guid",
                Decco.stringToJson(v.guid)
              ],
              [
                "slug",
                Decco.stringToJson(v.slug)
              ],
              [
                "description",
                Decco.optionToJson(Decco.stringToJson, v.description)
              ],
              [
                "html_description",
                Decco.optionToJson(Decco.stringToJson, v.html_description)
              ],
              [
                "privacy",
                t_encode$2(v.privacy)
              ],
              [
                "state",
                Decco.stringToJson(toString(v.state))
              ],
              [
                "is_explicit",
                Decco.boolToJson(v.is_explicit)
              ],
              [
                "can_download",
                Decco.boolToJson(v.can_download)
              ],
              [
                "duration",
                Decco.floatToJson(v.duration)
              ],
              [
                "image_url",
                Decco.optionToJson(Decco.stringToJson, v.image_url)
              ],
              [
                "audio_url",
                Decco.stringToJson(v.audio_url)
              ],
              [
                "site_url",
                Decco.optionToJson(Decco.stringToJson, v.site_url)
              ],
              [
                "smartlink_url",
                Decco.stringToJson(v.smartlink_url)
              ],
              [
                "waveform_url",
                Decco.stringToJson(v.waveform_url)
              ],
              [
                "downloads_count",
                Decco.intToJson(v.downloads_count)
              ],
              [
                "auto_sharing",
                Decco.arrayToJson(t_encode$4, v.auto_sharing)
              ],
              [
                "published_at",
                Decco.stringToJson(v.published_at.toISOString())
              ],
              [
                "created_at",
                Decco.stringToJson(v.created_at.toISOString())
              ],
              [
                "updated_at",
                Decco.stringToJson(v.updated_at.toISOString())
              ],
              [
                "tags",
                simpleData_encode((function (param) {
                        return Decco.arrayToJson(tag_encode, param);
                      }), v.tags)
              ],
              [
                "files",
                simpleData_encode((function (param) {
                        return Decco.arrayToJson(file_encode, param);
                      }), v.files)
              ]
            ]);
}

function t_decode$5(v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var dict$1 = dict._0;
  var id = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "id"), null));
  if (id.TAG) {
    var e = id._0;
    return {
            TAG: 1,
            _0: {
              path: ".id" + e.path,
              message: e.message,
              value: e.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var show_id = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "show_id"), null));
  if (show_id.TAG) {
    var e$1 = show_id._0;
    return {
            TAG: 1,
            _0: {
              path: ".show_id" + e$1.path,
              message: e$1.message,
              value: e$1.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var type_ = t_decode$1(Belt_Option.getWithDefault(Js_dict.get(dict$1, "type"), null));
  if (type_.TAG) {
    var e$2 = type_._0;
    return {
            TAG: 1,
            _0: {
              path: ".type" + e$2.path,
              message: e$2.message,
              value: e$2.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var season_id = Decco.optionFromJson(Decco.intFromJson, Belt_Option.getWithDefault(Js_dict.get(dict$1, "season_id"), null));
  if (season_id.TAG) {
    var e$3 = season_id._0;
    return {
            TAG: 1,
            _0: {
              path: ".season_id" + e$3.path,
              message: e$3.message,
              value: e$3.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var name = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "name"), null));
  if (name.TAG) {
    var e$4 = name._0;
    return {
            TAG: 1,
            _0: {
              path: ".name" + e$4.path,
              message: e$4.message,
              value: e$4.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var public_id = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "public_id"), null));
  if (public_id.TAG) {
    var e$5 = public_id._0;
    return {
            TAG: 1,
            _0: {
              path: ".public_id" + e$5.path,
              message: e$5.message,
              value: e$5.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var guid = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "guid"), null));
  if (guid.TAG) {
    var e$6 = guid._0;
    return {
            TAG: 1,
            _0: {
              path: ".guid" + e$6.path,
              message: e$6.message,
              value: e$6.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var slug = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "slug"), null));
  if (slug.TAG) {
    var e$7 = slug._0;
    return {
            TAG: 1,
            _0: {
              path: ".slug" + e$7.path,
              message: e$7.message,
              value: e$7.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var description = Decco.optionFromJson(Decco.stringFromJson, Belt_Option.getWithDefault(Js_dict.get(dict$1, "description"), null));
  if (description.TAG) {
    var e$8 = description._0;
    return {
            TAG: 1,
            _0: {
              path: ".description" + e$8.path,
              message: e$8.message,
              value: e$8.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var html_description = Decco.optionFromJson(Decco.stringFromJson, Belt_Option.getWithDefault(Js_dict.get(dict$1, "html_description"), null));
  if (html_description.TAG) {
    var e$9 = html_description._0;
    return {
            TAG: 1,
            _0: {
              path: ".html_description" + e$9.path,
              message: e$9.message,
              value: e$9.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var privacy = t_decode$2(Belt_Option.getWithDefault(Js_dict.get(dict$1, "privacy"), null));
  if (privacy.TAG) {
    var e$10 = privacy._0;
    return {
            TAG: 1,
            _0: {
              path: ".privacy" + e$10.path,
              message: e$10.message,
              value: e$10.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var state = t_decode$3(Belt_Option.getWithDefault(Js_dict.get(dict$1, "state"), null));
  if (state.TAG) {
    var e$11 = state._0;
    return {
            TAG: 1,
            _0: {
              path: ".state" + e$11.path,
              message: e$11.message,
              value: e$11.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var is_explicit = Decco.boolFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "is_explicit"), null));
  if (is_explicit.TAG) {
    var e$12 = is_explicit._0;
    return {
            TAG: 1,
            _0: {
              path: ".is_explicit" + e$12.path,
              message: e$12.message,
              value: e$12.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var can_download = Decco.boolFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "can_download"), null));
  if (can_download.TAG) {
    var e$13 = can_download._0;
    return {
            TAG: 1,
            _0: {
              path: ".can_download" + e$13.path,
              message: e$13.message,
              value: e$13.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var duration = Decco.floatFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "duration"), null));
  if (duration.TAG) {
    var e$14 = duration._0;
    return {
            TAG: 1,
            _0: {
              path: ".duration" + e$14.path,
              message: e$14.message,
              value: e$14.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var image_url = Decco.optionFromJson(Decco.stringFromJson, Belt_Option.getWithDefault(Js_dict.get(dict$1, "image_url"), null));
  if (image_url.TAG) {
    var e$15 = image_url._0;
    return {
            TAG: 1,
            _0: {
              path: ".image_url" + e$15.path,
              message: e$15.message,
              value: e$15.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var audio_url = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "audio_url"), null));
  if (audio_url.TAG) {
    var e$16 = audio_url._0;
    return {
            TAG: 1,
            _0: {
              path: ".audio_url" + e$16.path,
              message: e$16.message,
              value: e$16.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var site_url = Decco.optionFromJson(Decco.stringFromJson, Belt_Option.getWithDefault(Js_dict.get(dict$1, "site_url"), null));
  if (site_url.TAG) {
    var e$17 = site_url._0;
    return {
            TAG: 1,
            _0: {
              path: ".site_url" + e$17.path,
              message: e$17.message,
              value: e$17.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var smartlink_url = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "smartlink_url"), null));
  if (smartlink_url.TAG) {
    var e$18 = smartlink_url._0;
    return {
            TAG: 1,
            _0: {
              path: ".smartlink_url" + e$18.path,
              message: e$18.message,
              value: e$18.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var waveform_url = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "waveform_url"), null));
  if (waveform_url.TAG) {
    var e$19 = waveform_url._0;
    return {
            TAG: 1,
            _0: {
              path: ".waveform_url" + e$19.path,
              message: e$19.message,
              value: e$19.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var downloads_count = Decco.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "downloads_count"), null));
  if (downloads_count.TAG) {
    var e$20 = downloads_count._0;
    return {
            TAG: 1,
            _0: {
              path: ".downloads_count" + e$20.path,
              message: e$20.message,
              value: e$20.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var auto_sharing = Decco.arrayFromJson(t_decode$4, Belt_Option.getWithDefault(Js_dict.get(dict$1, "auto_sharing"), null));
  if (auto_sharing.TAG) {
    var e$21 = auto_sharing._0;
    return {
            TAG: 1,
            _0: {
              path: ".auto_sharing" + e$21.path,
              message: e$21.message,
              value: e$21.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var published_at = t_decode(Belt_Option.getWithDefault(Js_dict.get(dict$1, "published_at"), null));
  if (published_at.TAG) {
    var e$22 = published_at._0;
    return {
            TAG: 1,
            _0: {
              path: ".published_at" + e$22.path,
              message: e$22.message,
              value: e$22.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var created_at = t_decode(Belt_Option.getWithDefault(Js_dict.get(dict$1, "created_at"), null));
  if (created_at.TAG) {
    var e$23 = created_at._0;
    return {
            TAG: 1,
            _0: {
              path: ".created_at" + e$23.path,
              message: e$23.message,
              value: e$23.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var updated_at = t_decode(Belt_Option.getWithDefault(Js_dict.get(dict$1, "updated_at"), null));
  if (updated_at.TAG) {
    var e$24 = updated_at._0;
    return {
            TAG: 1,
            _0: {
              path: ".updated_at" + e$24.path,
              message: e$24.message,
              value: e$24.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var v$1 = Belt_Option.getWithDefault(Js_dict.get(dict$1, "tags"), null);
  var tags = simpleData_decode((function (param) {
          return Decco.arrayFromJson(tag_decode, param);
        }), v$1);
  if (tags.TAG) {
    var e$25 = tags._0;
    return {
            TAG: 1,
            _0: {
              path: ".tags" + e$25.path,
              message: e$25.message,
              value: e$25.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var v$2 = Belt_Option.getWithDefault(Js_dict.get(dict$1, "files"), null);
  var files = simpleData_decode((function (param) {
          return Decco.arrayFromJson(file_decode, param);
        }), v$2);
  if (!files.TAG) {
    return {
            TAG: 0,
            _0: {
              id: id._0,
              show_id: show_id._0,
              type_: type_._0,
              season_id: season_id._0,
              name: name._0,
              public_id: public_id._0,
              guid: guid._0,
              slug: slug._0,
              description: description._0,
              html_description: html_description._0,
              privacy: privacy._0,
              state: state._0,
              is_explicit: is_explicit._0,
              can_download: can_download._0,
              duration: duration._0,
              image_url: image_url._0,
              audio_url: audio_url._0,
              site_url: site_url._0,
              smartlink_url: smartlink_url._0,
              waveform_url: waveform_url._0,
              downloads_count: downloads_count._0,
              auto_sharing: auto_sharing._0,
              published_at: published_at._0,
              created_at: created_at._0,
              updated_at: updated_at._0,
              tags: tags._0,
              files: files._0
            },
            [Symbol.for("name")]: "Ok"
          };
  }
  var e$26 = files._0;
  return {
          TAG: 1,
          _0: {
            path: ".files" + e$26.path,
            message: e$26.message,
            value: e$26.value
          },
          [Symbol.for("name")]: "Error"
        };
}

var Podcast = {
  Type: Type,
  Privacy: Privacy,
  State: State,
  AutoSharing: AutoSharing,
  tag_encode: tag_encode,
  tag_decode: tag_decode,
  file_encode: file_encode,
  file_decode: file_decode,
  t_encode: t_encode$5,
  t_decode: t_decode$5
};

function t_encode$6(v) {
  return data_encode(t_encode$5, v);
}

function t_decode$6(v) {
  return data_decode(t_decode$5, v);
}

function get$1(publicOpt, private_Opt, unlistedOpt, activeOpt, draftOpt, scheduledOpt, param) {
  var $$public = publicOpt !== undefined ? publicOpt : false;
  var private_ = private_Opt !== undefined ? private_Opt : false;
  var unlisted = unlistedOpt !== undefined ? unlistedOpt : false;
  var active = activeOpt !== undefined ? activeOpt : false;
  var draft = draftOpt !== undefined ? draftOpt : false;
  var scheduled = scheduledOpt !== undefined ? scheduledOpt : false;
  var statuses = [];
  if ($$public) {
    statuses.push("public");
  }
  if (private_) {
    statuses.push("private");
  }
  if (unlisted) {
    statuses.push("unlisted");
  }
  if (active) {
    statuses.push("active");
  }
  if (draft) {
    statuses.push("draft");
  }
  if (scheduled) {
    statuses.push("scheduled");
  }
  var queryString = statuses.length !== 0 ? "?" + Belt_Array.joinWith(Belt_Array.map(statuses, (function (status) {
                return "status[]=" + status;
              })), "&", (function (s) {
            return s;
          })) : "";
  var url = "" + baseUrl + "/v1/shows/" + showId + "/podcasts" + queryString;
  return $$Promise.flatMap(get(url), (function (prim) {
                return prim.json();
              }));
}

var Podcasts = {
  t_encode: t_encode$6,
  t_decode: t_decode$6,
  get: get$1
};

function t_encode$7(v) {
  return Js_dict.fromArray([
              [
                "description",
                Decco.stringToJson(v.description)
              ],
              [
                "html_description",
                Decco.stringToJson(v.html_description)
              ]
            ]);
}

function t_decode$7(v) {
  var dict = Js_json.classify(v);
  if (typeof dict === "number") {
    return Decco.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== /* JSONObject */2) {
    return Decco.error(undefined, "Not an object", v);
  }
  var dict$1 = dict._0;
  var description = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "description"), null));
  if (description.TAG) {
    var e = description._0;
    return {
            TAG: 1,
            _0: {
              path: ".description" + e.path,
              message: e.message,
              value: e.value
            },
            [Symbol.for("name")]: "Error"
          };
  }
  var html_description = Decco.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "html_description"), null));
  if (!html_description.TAG) {
    return {
            TAG: 0,
            _0: {
              description: description._0,
              html_description: html_description._0
            },
            [Symbol.for("name")]: "Ok"
          };
  }
  var e$1 = html_description._0;
  return {
          TAG: 1,
          _0: {
            path: ".html_description" + e$1.path,
            message: e$1.message,
            value: e$1.value
          },
          [Symbol.for("name")]: "Error"
        };
}

var Show = {
  t_encode: t_encode$7,
  t_decode: t_decode$7
};

function t_encode$8(v) {
  return simpleData_encode(t_encode$7, v);
}

function t_decode$8(v) {
  return simpleData_decode(t_decode$7, v);
}

function get$2(param) {
  var url = "" + baseUrl + "/v1/shows/" + showId;
  return $$Promise.flatMap(get(url), (function (prim) {
                return prim.json();
              }));
}

var SingleById = {
  t_encode: t_encode$8,
  t_decode: t_decode$8,
  get: get$2
};

var Shows = {
  SingleById: SingleById
};

export {
  baseUrl ,
  showId ,
  get ,
  IsoDate ,
  Common ,
  Podcast ,
  Podcasts ,
  Show ,
  Shows ,
  
}
/* Promise Not a pure module */
