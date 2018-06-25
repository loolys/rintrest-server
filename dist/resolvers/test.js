"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _jwtDecode = require("jwt-decode");

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  Query: {
    allCats: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, _ref) {
        var Cat = _ref.Cat;
        var cats, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Cat.find();

              case 2:
                cats = _context.sent;

                console.log(cats);
                result = cats.map(function (x) {
                  x._id = x._id.toString();
                  return x;
                });
                return _context.abrupt("return", result);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      function allCats(_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return allCats;
    }(),
    allPins: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(parent, args, _ref3) {
        var Pin = _ref3.Pin;
        var pins, result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Pin.find();

              case 2:
                pins = _context2.sent;
                result = pins.map(function (x) {
                  x._id = x._id.toString();
                  return x;
                });
                return _context2.abrupt("return", result);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));

      function allPins(_x4, _x5, _x6) {
        return _ref4.apply(this, arguments);
      }

      return allPins;
    }(),
    usersPins: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(parent, _ref5, _ref6) {
        var header = _ref5.header;
        var Pin = _ref6.Pin;
        var username, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                username = header;
                _context3.next = 3;
                return Pin.find({ user: username });

              case 3:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, undefined);
      }));

      function usersPins(_x7, _x8, _x9) {
        return _ref7.apply(this, arguments);
      }

      return usersPins;
    }()
  },
  Mutation: {
    createCat: function () {
      var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(parent, args, _ref8) {
        var Cat = _ref8.Cat;
        var kitty;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return new Cat(args).save();

              case 2:
                kitty = _context4.sent;

                kitty._id = kitty._id.toString();
                return _context4.abrupt("return", kitty);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, undefined);
      }));

      function createCat(_x10, _x11, _x12) {
        return _ref9.apply(this, arguments);
      }

      return createCat;
    }(),
    createPin: function () {
      var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(parent, args, _ref10) {
        var Pin = _ref10.Pin;
        var pin;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Pin(args).save();

              case 2:
                pin = _context5.sent;

                console.log(pin);
                return _context5.abrupt("return", pin);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, undefined);
      }));

      function createPin(_x13, _x14, _x15) {
        return _ref11.apply(this, arguments);
      }

      return createPin;
    }(),
    createUser: function () {
      var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(parent, args, _ref12) {
        var User = _ref12.User;
        var newUser, user;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log(args);
                newUser = new User(args);
                _context6.prev = 2;
                _context6.next = 5;
                return newUser.save();

              case 5:
                user = _context6.sent;
                return _context6.abrupt("return", {
                  success: true,
                  username: user.username
                });

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](2);
                return _context6.abrupt("return", {
                  success: false,
                  username: "",
                  error: {
                    path: "Username",
                    message: "Username already exists"
                  }
                });

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, undefined, [[2, 9]]);
      }));

      function createUser(_x16, _x17, _x18) {
        return _ref13.apply(this, arguments);
      }

      return createUser;
    }(),
    likePin: function () {
      var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(parent, _ref14, _ref15) {
        var username = _ref14.username,
            id = _ref14.id;
        var Pin = _ref15.Pin;
        var pin;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return Pin.findById(id);

              case 2:
                pin = _context7.sent;

                if (!(pin.likes.indexOf(username) === -1)) {
                  _context7.next = 7;
                  break;
                }

                return _context7.abrupt("return", Pin.findByIdAndUpdate(id, {
                  $inc: { likeCount: 1 },
                  $push: { likes: username }
                }, { new: true }));

              case 7:
                return _context7.abrupt("return", Pin.findByIdAndUpdate(id, {
                  $inc: { likeCount: -1 },
                  $pull: { likes: username }
                }, { new: true }));

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, undefined);
      }));

      function likePin(_x19, _x20, _x21) {
        return _ref16.apply(this, arguments);
      }

      return likePin;
    }(),
    loginUser: function () {
      var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(parent, _ref17, _ref18) {
        var username = _ref17.username,
            password = _ref17.password;
        var User = _ref18.User;
        var user, validate, token;
        return _regenerator2.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return User.findOne({ username: username }, function (err, user) {
                  if (err) return false;
                });

              case 2:
                user = _context8.sent;

                if (user) {
                  _context8.next = 5;
                  break;
                }

                return _context8.abrupt("return", {
                  success: false,
                  error: {
                    path: "User",
                    message: "Username Not Found"
                  }
                });

              case 5:
                _context8.next = 7;
                return _bcrypt2.default.compare(password, user.password);

              case 7:
                validate = _context8.sent;

                if (validate) {
                  _context8.next = 10;
                  break;
                }

                return _context8.abrupt("return", {
                  success: false,
                  error: {
                    path: "Password",
                    message: "Invalid Password"
                  }
                });

              case 10:
                token = _jsonwebtoken2.default.sign({
                  id: user._id,
                  username: user.username
                }, process.env.SECRET);


                console.log(token);

                return _context8.abrupt("return", {
                  success: validate,
                  token: token
                });

              case 13:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, undefined);
      }));

      function loginUser(_x22, _x23, _x24) {
        return _ref19.apply(this, arguments);
      }

      return loginUser;
    }()
  }
};