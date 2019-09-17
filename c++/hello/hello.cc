#include <node.h>;
#include <v8.h>
#include <iostream>

namespace demo {
    using v8 :: FunctionCallBackInfo;
    using v8 :: Isolate;
    using v8 :: Local;
    using v8 :: Object;
    using v8 :: String;
    using v8 :: Value;

    void Method (const FunctionCallBackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        args.GetReturnValue().Set(String :: NewFromUtf8(isolate, 'world'));
    }
}