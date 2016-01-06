define([
    "angular",
    "angular-couch-potato",
    "angular-ui-router",
    "angular-resource",
    "angular-ui-select"
], function (ng, couchPotato) {
    "use strict";

    var module = ng.module("app.search", ["ui.router", "ngResource", "ui.select"]);

    module.config(function ($stateProvider, $couchPotatoProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyARh9SCNR-vNADst2P-co2fPy0yiSKhP64',
            v: '3.17'
        });
        $stateProvider
            .state("app.search", {
                url: "/search",
                abstract: true,
                views: {
                    "content@app": {
                        controller: 'SearchCtrl',
                        templateUrl: function ($stateParams) { return '/app/modules/search/views/search.tpl.html' },
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'modules/search/controllers/SearchCtrl',
                                'modules/search/services/SearchService',
                                'modules/global/services/FieldSetService',
                                'modules/fieldsetPresenter/controllers/EditOptionsCtrl',
                                'modules/previewLand/controllers/PreviewLotCtrl',
                                'modules/fieldsetPresenter/controllers/AreaEditorCtrl'

                            ]),
                            api: function (uiGmapGoogleMapApi) {
                                return uiGmapGoogleMapApi;
                            }
                        }
                    }
                }
            })
            .state("app.search.editLot", {
                url: "/editLot/:id",
                views: {
                    "contentLot": {
                        controller: "EditLotCtrl",
                        templateUrl: "/app/modules/editLot/views/editLot.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotCtrl",
                                "modules/editLot/services/EditLotService"
                            ])
                        }
                    }
                }
            })
            .state("app.search.editLot.status",
            {
                url: "/status",
                views: {
                    "contentLotChild": {
                        controller: "EditLotStatusCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotStatus.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotStatusCtrl"
                            ])
                        }
                    }
                }
            })
            .state("app.search.editLot.location",
            {
                url: "/location",
                views: {
                    "contentLotChild": {
                        controller: "EditLotLocationCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotLocation.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotLocationCtrl"
                            ])
                        }
                    }
                }
            })
            .state("app.search.editLot.transportation",
            {
                url: "/transportation",
                views: {
                    "contentLotChild": {
                        controller: "EditLotTransportationCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotTransportation.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotTransportationCtrl",
                                "modules/editLot/services/TrafficFlowService"
                            ])
                        }
                    }
                }
            })
            .state("app.search.editLot.prosconsrisks",
            {
                url: "/prosconsrisks",
                views: {
                    "contentLotChild": {
                        controller: "EditLotProsConsRisksCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotProsConsRisks.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotProsConsRisksCtrl"
                            ])
                        }
                    }
                }
            })
            .state("app.search.editLot.notesreportsdrawings",
            {
                url: "/notesreportsdrawings",
                views: {
                    "contentLotChild": {
                        controller: "EditLotNotesReportsDrawingsCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotNotesReportsDrawings.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotNotesReportsDrawingsCtrl"
                            ])
                        }
                    }
                }
            })
            .state("app.search.editLot.images",
            {
                url: "/images",
                views: {
                    "contentLotChild": {
                        controller: "EditLotImagesCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotImages.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotImagesCtrl"
                            ])
                        }
                    }
                }
            })
            .state("app.search.editLot.map",
            {
                url: "/map",
                views: {
                    "contentLotChild": {
                        controller: "EditLotMapCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotMap.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotMapCtrl",
                                'modules/global/services/LandService'
                            ])
                        }
                    }
                }
            })
             .state("app.search.editLot.sale",
            {
                url: "/sale/:subEntityId",
                views: {
                    "contentLotChild": {
                        controller: "EditLotSaleCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotSale.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotSaleCtrl",
                                'modules/global/services/FieldSetService'
                            ])
                        }
                    }
                }
            })
            .state("app.search.editLot.supply",
            {
                url: "/supply/:subEntityId",
                views: {
                    "contentLotChild": {
                        controller: "EditLotSupplyCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotSupply.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotSupplyCtrl",
                                'modules/global/services/FieldSetService'
                            ])
                        }
                    }
                }
            })
            .state("app.search.editLot.zoning",
            {
                url: "/zoning/:subEntityId",
                views: {
                    "contentLotChild": {
                        controller: "EditLotZoningCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotZoning.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotZoningCtrl",
                                'modules/global/services/FieldSetService'
                            ])
                        }
                    }
                }
            })
            .state("app.search.editLot.taxation",
            {
                url: "/taxation/:subEntityId",
                views: {
                    "contentLotChild": {
                        controller: "EditLotTaxationCtrl",
                        templateUrl: "/app/modules/editLot/views/editLotTaxation.tpl.html",
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                "modules/editLot/controllers/EditLotTaxationCtrl",
                                'modules/global/services/FieldSetService',
                                'modules/editLot/directives/MillRateDirective'
                            ])
                        }
                    }
                }
            })
        //.state("app.search.editLot.map",
        //{
        //    url: "/map/:id",
        //    data: {
        //        title: "map"
        //    },
        //    views: {
        //        "contentLotChild": {
        //            controller: "EditLotMapCtrl",
        //            templateUrl: "/app/modules/editLot/views/editLotMap.tpl.html",
        //            resolve: {
        //                deps: $couchPotatoProvider.resolveDependencies([
        //                    "modules/editLot/controllers/EditLotMapCtrl",
        //                    'modules/global/services/LandService'
        //                ])
        //            }
        //        }
        //    }
        //})
        //.state("app.search.editLot.images",
        //{
        //    url: "/images/:id",
        //    data: {
        //        title: "Images"
        //    },
        //    views: {
        //        "contentLotChild": {
        //            controller: "EditLotImagesCtrl",
        //            templateUrl: "/app/modules/editLot/views/editLotImages.tpl.html",
        //            resolve: {
        //                deps: $couchPotatoProvider.resolveDependencies([
        //                    "modules/editLot/controllers/EditLotImagesCtrl"
        //                ])
        //            }
        //        }
        //    }
        //})
        //.state("app.search.editLot.sales",
        //{
        //    url: "/sales/:id",
        //    data: {
        //        title: "Sales"
        //    },
        //    views: {
        //        "contentLotChild": {
        //            controller: "EditLotSalesCtrl",
        //            templateUrl: "/app/modules/editLot/views/editLotSales.tpl.html",
        //            resolve: {
        //                deps: $couchPotatoProvider.resolveDependencies([
        //                    "modules/editLot/controllers/EditLotSalesCtrl"
        //                ])
        //            }
        //        }
        //    }
        //})
        //.state("app.search.editLot.supply",
        //{
        //    url: "/supply/:id",
        //    data: {
        //        title: "Supply"
        //    },
        //    views: {
        //        "contentLotChild": {
        //            controller: "EditLotSupplyCtrl",
        //            templateUrl: "/app/modules/editLot/views/editLotSupply.tpl.html",
        //            resolve: {
        //                deps: $couchPotatoProvider.resolveDependencies([
        //                    "modules/editLot/controllers/EditLotSupplyCtrl"
        //                ])
        //            }
        //        }
        //    }
        //})
        //.state("app.search.editLot.zoning",
        //{
        //    url: "/zoning/:id",
        //    data: {
        //        title: "Zoning"
        //    },
        //    views: {
        //        "contentLotChild": {
        //            controller: "EditLotZoningCtrl",
        //            templateUrl: "/app/modules/editLot/views/editLotZoning.tpl.html",
        //            resolve: {
        //                deps: $couchPotatoProvider.resolveDependencies([
        //                    "modules/editLot/controllers/EditLotZoningCtrl"
        //                ])
        //            }
        //        }
        //    }
        //})
        //.state("app.search.editLot.taxation",
        //{
        //    url: "/taxation/:id",
        //    data: {
        //        title: "Taxation"
        //    },
        //    views: {
        //        "contentLotChild": {
        //            controller: "EditLotTaxationCtrl",
        //            templateUrl: "/app/modules/editLot/views/editLotTaxation.tpl.html",
        //            resolve: {
        //                deps: $couchPotatoProvider.resolveDependencies([
        //                    "modules/editLot/controllers/EditLotTaxationCtrl"
        //                ])
        //            }
        //        }
        //    }
        //})
        //.state("app.search.editLot.notes",
        //{
        //    url: "/notes/:id",
        //    data: {
        //        title: "Notes"
        //    },
        //    views: {
        //        "contentLotChild": {
        //            controller: "EditLotNotesCtrl",
        //            templateUrl: "/app/modules/editLot/views/editLotNotes.tpl.html",
        //            resolve: {
        //                deps: $couchPotatoProvider.resolveDependencies([
        //                    "modules/editLot/controllers/EditLotNotesCtrl"
        //                ])
        //            }
        //        }
        //    }
        //})
        //.state("app.search.editLot.landtitles",
        //{
        //    url: "/landtitles/:id",
        //    data: {
        //        title: "Land Titles"
        //    },
        //    views: {
        //        "contentLotChild": {
        //            controller: "EditLotImagesCtrl",
        //            templateUrl: "/app/modules/editLot/views/editLotLandTitles.tpl.html",
        //            resolve: {
        //                deps: $couchPotatoProvider.resolveDependencies([
        //                    "modules/editLot/controllers/EditLotLandTitlesCtrl"
        //                ])
        //            }
        //        }
        //    }
        //})

        //.state("app.search.editLotCollection",
        //{
        //    url: "/editLotCollection/:id",

        //    data: {
        //        title: "editLotCollection"
        //    },
        //    views: {
        //        "contentLot": {
        //            controller: "EditLotCollectionCtrl",
        //            templateUrl: "/app/modules/search/views/editLotCollection.tpl.html",
        //            resolve: {
        //                deps: $couchPotatoProvider.resolveDependencies([
        //                    "modules/search/controllers/EditLotCollectionCtrl"
        //                ])
        //            }
        //        }
        //    }
        //})
        .state("app.search.previewLot",
        {
            url: "/previewLot/:id",
            data: {
                title: "previewLot"
            },
            views: {
                "contentLot": {
                    controller: "PreviewLotCtrl",
                    templateUrl: "/app/modules/search/views/previewLot.tpl.html",
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            "modules/search/controllers/PreviewLotCtrl",
                            "modules/global/services/LandService"
                        ])
                    }
                }
            }
        })
         .state("app.search.map",
        {
            url: "/map/:id",
            data: {
                title: "map"
            },
            views: {
                "contentMap": {
                    controller: "MapCtrl",
                    templateUrl: "/app/modules/search/views/map.tpl.html",
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            "modules/search/controllers/MapCtrl"
                        ])
                    }
                }
            }
        })
        .state("app.search.image", {
            url: "/image/",
            data: {
                title: "image"
            },
            views: {
                "contentLot": {
                    controller: "ImageCtrl",
                    templateUrl: "/app/modules/search/views/image.tpl.html",
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            "modules/search/controllers/ImageCtrl",
                            "modules/search/services/ImageService"
                        ])
                    }
                }
            }
        })

        .state("app.search.editLotCollection",
        {
            url: "/editLotCollection",
            abstract: true,
            data: {
                title: "Lot Collection"
            },
            views: {
                "contentLot": {
                    controller: "EditLotCollectionCtrl",
                    templateUrl: "/app/modules/editLotCollection/views/editLotCollection.tpl.html",
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            "modules/editLotCollection/controllers/EditLotCollectionCtrl"
                        ])
                    }
                }
            }
        })
        .state("app.search.editLotCollection.profile",
        {
            url: "/profile/:id",
            data: {
                title: "profile"
            },
            views: {
                "contentLotCollectionChild": {
                    controller: "EditLotCollectionProfileCtrl",
                    templateUrl: "/app/modules/editLotCollection/views/editLotCollectionProfile.tpl.html",
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            "modules/editLotCollection/controllers/EditLotCollectionProfileCtrl",
                            "modules/editLotCollection/controllers/AddLotModuleCtrl"

                        ])
                    }
                }
            }
        })
        .state("app.search.editLotCollection.sales",
        {
            url: "/sales/:id",
            data: {
                title: "sales"
            },
            views: {
                "contentLotCollectionChild": {
                    controller: "EditLotCollectionProfileCtrl",
                    templateUrl: "/app/modules/editLotCollection/views/editLotCollectionSales.tpl.html",
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            "modules/editLotCollection/controllers/EditLotCollectionSalesCtrl"
                        ])
                    }
                }
            }
        })
        ;
    });

    couchPotato.configureApp(module);
    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });
    return module;
});