import Ember from 'ember';

export default Ember.Service.extend({

  template: {
    "values": {
      "settings": {
        "appGeocoders": [
          {
            "singleLineFieldName": "SingleLine",
            "name": "Esri World Geocoder",
            "url": "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
          }
        ],
        "layout": {
          "id": "side"
        },
        "layoutOptions": {
          "layoutCfg": {
            "size": "small",
            "position": "left"
          },
          "socialLinks": false
        },
        "theme": {
          "colors": {
            "name": "side-default-1",
            "themeMajor": "white",
            "dotNav": "#777777",
            "panel": "#FFFFFF",
            "media": "#EEEEEE",
            "text": "#000000",
            "textLink": "#555",
            "softText": "#c0c0c0",
            "softBtn": "#444",
            "esriLogo": "black"
          },
          "fonts": {
            "sectionTitle": {
              "id": "default",
              "value": "font-family:'open_sansregular', sans-serif;"
            },
            "sectionContent": {
              "id": "default",
              "value": "font-family:'open_sansregular', sans-serif;"
            }
          }
        },
        "header": {
          "linkText": "A story map",
          "linkURL": "http://storymaps.arcgis.com",
          "logoURL": null,
          "logoTarget": "",
          "social": {
            "facebook": true,
            "twitter": true,
            "bitly": true
          }
        }
      },
      "title": "Annual Report\n",
      "story": {
        "storage": "WEBAPP",
        "sections": [
          {
            "title": "<p><span style=\"font-size:40px\">Annual Report</span></p>\n",
            "content": "<p><span style=\"font-size:26px\">Overview</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style=\"color:#D3D3D3\"><span style=\"font-size:14px\">[Report Overview]</span></span></p>\n",
            "contentActions": [],
            "creaDate": 1496960691242,
            "pubDate": 1496960691242,
            "status": "PUBLISHED",
            "media": {
              "type": "webpage",
              "webpage": {
                "url": "",
                "type": "webpage",
                "display": "stretch",
                "unload": true,
                "frameTag": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/Lmmp9UfNQhU?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1\" frameborder=\"0\" allowfullscreen=\"\"></iframe>",
                "ts": 1496960691226
              }
            }
          },
          {
            "title": "<p><span style=\"font-size:26px\">Introduction</span></p>\n",
            "content": "<p><span style=\"color:#D3D3D3\">[Introduction Text]</span></p>\n",
            "contentActions": [],
            "creaDate": 1496960106083,
            "pubDate": 1496960106083,
            "status": "PUBLISHED",
            "media": {
              "type": "image",
              "image": {
                "url": "https://unsplash.it/1200/1000/?image=486",
                "type": "image",
                "display": "fill"
              }
            }
          },
          {
            "title": "<p><span style=\"font-size:26px\">Members</span></p>\n",
            "content": "<p><span style=\"color:#D3D3D3\">[Member Overview]</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style=\"color:#0000CD\"><a data-storymaps=\"MJ-ACTION-1496960818148\" data-storymaps-type=\"media\">Europe</a></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style=\"color:#0000CD\"><a data-storymaps=\"MJ-ACTION-1496960832830\" data-storymaps-type=\"media\">East Africa</a></span></p>\n\n<p><br>\n<span style=\"color:#0000CD\"><a data-storymaps=\"MJ-ACTION-1496960846364\" data-storymaps-type=\"media\">United States</a></span></p>\n",
            "contentActions": [
              {
                "id": "MJ-ACTION-1496960818148",
                "type": "media",
                "media": {
                  "type": "webmap",
                  "webmap": {
                    "id": "a410b032c3db43c9ad6f15889f9d0081",
                    "extent": {
                      "xmin": -1543417.170881017,
                      "ymin": 3685460.7641941947,
                      "xmax": 2981654.903600214,
                      "ymax": 7965934.348162927,
                      "spatialReference": {
                        "wkid": 102100
                      }
                    },
                    "layers": null,
                    "popup": null,
                    "overview": {
                      "enable": false,
                      "openByDefault": true
                    },
                    "legend": {
                      "enable": false,
                      "openByDefault": false
                    },
                    "geocoder": {
                      "enable": false
                    }
                  }
                }
              },
              {
                "id": "MJ-ACTION-1496960832830",
                "type": "media",
                "media": {
                  "type": "webmap",
                  "webmap": {
                    "id": "a410b032c3db43c9ad6f15889f9d0081",
                    "extent": {
                      "xmin": 1929881.3943964683,
                      "ymin": -2184903.0081057814,
                      "xmax": 6454953.4688777,
                      "ymax": 2095570.5758629513,
                      "spatialReference": {
                        "wkid": 102100
                      }
                    },
                    "layers": null,
                    "popup": null,
                    "overview": {
                      "enable": false,
                      "openByDefault": true
                    },
                    "legend": {
                      "enable": false,
                      "openByDefault": false
                    },
                    "geocoder": {
                      "enable": false
                    }
                  }
                }
              },
              {
                "id": "MJ-ACTION-1496960846364",
                "type": "media",
                "media": {
                  "type": "webmap",
                  "webmap": {
                    "id": "a410b032c3db43c9ad6f15889f9d0081",
                    "extent": {
                      "xmin": -14847129.069855835,
                      "ymin": 229284.09325258434,
                      "xmax": -5796984.920893374,
                      "ymax": 8790231.26119005,
                      "spatialReference": {
                        "wkid": 102100
                      }
                    },
                    "layers": null,
                    "popup": null,
                    "overview": {
                      "enable": false,
                      "openByDefault": true
                    },
                    "legend": {
                      "enable": false,
                      "openByDefault": false
                    },
                    "geocoder": {
                      "enable": false
                    }
                  }
                }
              }
            ],
            "creaDate": 1496960847839,
            "pubDate": 1496960847839,
            "status": "PUBLISHED",
            "media": {
              "type": "webmap",
              "webmap": {
                "id": "a410b032c3db43c9ad6f15889f9d0081",
                "extent": {
                  "xmin": -13335510.398488592,
                  "ymin": -6076464.9921596395,
                  "xmax": 4764777.899436331,
                  "ymax": 11045429.34371529,
                  "spatialReference": {
                    "wkid": 102100
                  }
                },
                "layers": null,
                "popup": null,
                "overview": {
                  "enable": false,
                  "openByDefault": true
                },
                "legend": {
                  "enable": false,
                  "openByDefault": false
                },
                "geocoder": {
                  "enable": false
                }
              }
            }
          },
          {
            "title": "<p><span style=\"font-size:26px\">Program Name Overview</span></p>\n",
            "content": "<p><span style=\"color:#D3D3D3\">[Program Overview Text]</span></p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<figure class=\"caption\">\n<div class=\"image-container activate-fullscreen\"><img alt=\"\" src=\"https://unsplash.it/400/400/?image=442\"></div>\n\n<figcaption>[Embedded Image]</figcaption>\n</figure>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n",
            "contentActions": [],
            "creaDate": 1496960902096,
            "pubDate": 1496960902096,
            "status": "PUBLISHED",
            "media": {
              "type": "image",
              "image": {
                "url": "https://unsplash.it/1200/1000/?image=491",
                "type": "image",
                "display": "fill"
              }
            }
          },
          {
            "title": "<p><span style=\"font-size:26px\">Credits</span></p>\n",
            "content": "<p><span style=\"color:#D3D3D3\">[Main Stage is an embedded website --&gt;]</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style=\"color:#D3D3D3\">[Credits Text]</span></p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n",
            "contentActions": [],
            "creaDate": 1496960940555,
            "pubDate": 1496960940555,
            "status": "PUBLISHED",
            "media": {
              "type": "webpage",
              "webpage": {
                "url": "https://esri.com",
                "type": "webpage",
                "display": "stretch",
                "unload": true
              }
            }
          },
          {
            "title": "<p><span style=\"font-size:26px\">Staff</span></p>\n",
            "content": "<p><span style=\"color:#D3D3D3\">[Staff Text]</span></p>\n",
            "contentActions": [],
            "creaDate": 1496961037808,
            "pubDate": 1496961037808,
            "status": "PUBLISHED",
            "media": {
              "type": "image",
              "image": {
                "url": "https://unsplash.it/1200/1000/?image=815",
                "type": "image",
                "display": "fill"
              }
            }
          }
        ]
      },
      "template": {
        "name": "Map Journal",
        "createdWith": "1.10.2",
        "editedWith": "1.10.2"
      }
    }
  }

});
