      // FOR VIEW 
      myApp.controller('ProductCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $window, toastr, $uibModal) {

              $scope.template = TemplateService.changecontent("Product/viewProduct");
              $scope.menutitle = NavigationService.makeactive("Product");
              TemplateService.title = $scope.menutitle;
              $scope.navigation = NavigationService.getnav();
              //FOR DISPLAY
              $scope.formData = {
                  page: 1,
                  keyword: "",
                  type: ""
              };
              $scope.detailProduct = function () {
                  $scope.formData.page = $scope.formData.page++;
                  NavigationService.apiCall("HtmlProduct/search", $scope.formData, function (result) {
                      $scope.Productitems = result.data.results;
                      $scope.totalItems = result.data.total;
                      $scope.maxRow = result.data.options.count;
                  })
              }
              $scope.detailProduct();


              $scope.searchInTable = function (data) {
                  //    $scope.formData.page = 1;
                  $scope.formData.keyword = data;
                  $scope.detailProduct();
              }
              // FOR DELETE
              $scope.deleteTable = function (data) {
                  //console.log("delete=====" + data)
                  var modalInstance = $uibModal.open({
                      animation: $scope.animationsEnabled,
                      templateUrl: '/backend/views/modal/conf-delete.html',
                      size: 'lg',
                      scope: $scope
                  })
                  $scope.close = function (value) {
                      if (value) {
                          //     console.log("####### " + value)
                          var id = {
                              _id: data
                          }
                          NavigationService.delete("HtmlProduct/delete", id, function (result) {
                              if (result.value) {
                                  $scope.detailProduct();
                                  modalInstance.close();
                                  toastr.success("successfull");
                              } else {
                                  toastr.error("unsucessfull");
                              }
                          })
                      } else {
                          modalInstance.close();
                          $scope.detailProduct();
                      }
                  }

              }



          })



          //For  CREATE 
          .controller('ProductDetailCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams) {
              $scope.template = TemplateService.changecontent("Product/detailProduct");
              $scope.menutitle = NavigationService.makeactive("CreateProduct");
              TemplateService.title = $scope.menutitle;
              $scope.navigation = NavigationService.getnav();
              // FOR SAVE
              //    $scope.formData = {};
              $scope.onSave = function (formData) {
                  NavigationService.apiCall("HtmlProduct/save", formData, function (result) {

                      if (result.value) {
                          $state.go("view-product");
                          toastr.success("successfull");
                      } else {
                          toastr.error("unsucessfull");
                      }

                  })
              }
              //FOR CANCEL
              $scope.onCancel = function () {
                  $state.go("view-product");
              }

              //FOR EDIT
              if ($stateParams.id) {
                  $scope.productId = $stateParams.id;
                  NavigationService.apiCall('HtmlProduct/getOne', {
                      _id: $scope.productId
                  }, function (result) {
                      $scope.formData = result.data;
                      $scope.formData.date = new Date(result.data.date)
                  });

              }


              $scope.brandName = function () {
                  NavigationService.apiCall("HtmlBrand/findAll", "", function (result) {
                      $scope.items = result.data;
                  })
              }
              $scope.brandName();

          })