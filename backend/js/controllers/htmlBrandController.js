// FOR DISPLAY
myApp.controller('BrandCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $window, toastr, $uibModal) {

        $scope.template = TemplateService.changecontent("Brand/viewBrand");
        $scope.menutitle = NavigationService.makeactive("Brand");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.formData = {
            page: 1,
            keyword: "",
            type: ""
        };

        $scope.dispalyBrand = function () {
            $scope.formData.page = $scope.formData.page++;
            NavigationService.apiCall("HtmlBrand/search", $scope.formData, function (result) {
                $scope.items = result.data.results,
                    $scope.totalItems = result.data.total,
                    $scope.maxRow = result.data.options.count
            })
        }
        $scope.dispalyBrand();

        $scope.searchInTable = function (data) {
            if (data.length > 1) {
                $scope.formData.keyword = data;
                $scope.dispalyBrand();
            } else if (data.length === 0) {
                $scope.formData.keyword = data;
                $scope.dispalyBrand();
            }

        }


        // FOR DELETE
        $scope.deleteBrand = function (id) {
            $scope.deleteid = id
            modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/conf-delete.html',
                size: 'lg',
                scope: $scope
            })
        }
        $scope.close = function (value) {
            console.log(value)
            if (value) {
                NavigationService.delete("HtmlBrand/delete", {
                    _id: $scope.deleteid
                }, function (result) {
                    // console.log(itemid)
                    if (result.value) {
                        $scope.dispalyBrand();
                        modalInstance.close();
                        toastr.success("Success")
                    } else {
                        $scope.dispalyBrand();
                        modalInstance.close();
                        toastr.error("UNSuccess")
                    }
                })
            } else {
                $scope.dispalyBrand();
                modalInstance.close();
            }
        }

    })


    // FOR CREATE
    .controller('BrandDetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $window, toastr, $uibModal) {

        $scope.template = TemplateService.changecontent("Brand/detailBrand");
        $scope.menutitle = NavigationService.makeactive("CreateBrand");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.onSave = function (data) {
            console.log("data===" + data)
            NavigationService.apiCall("HtmlBrand/save", data, function (result) {
                if (result.value) {
                    $state.go("view-brand")
                    toastr.success("success")
                } else {
                    toastr.error("unsuccess")
                }
            })
        }
        $scope.onCancel = function () {
            $state.go("view-brand")
        }

        if ($stateParams.id) {

            NavigationService.apiCall("HtmlBrand/getOne", {
                _id: $stateParams.id
            }, function (result) {
                $scope.formData = result.data;
                $scope.formData.date = new Date(result.data.date)
            })
        }

    })