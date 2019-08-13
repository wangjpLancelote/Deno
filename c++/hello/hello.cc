#include <node.h>;
#include <v8.h>
#include <iostream>

namespace hello
{
    using v8 :: FunctionCallBackInfo;
    using v8 :: Isolate;
    using v8 :: Local;
    using v8 :: Object;
    using v8 :: String;
    using v8 :: Value;
    using v8 :: Number;

    void Method1 (const FunctionCallBackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        args.GetReturnValue().Set(String :: NewFromUtf8(isolate, 'hello world'));
    }

    void Method2 (const FunctionCallBackInfo<Value>& args) {
        Isolate* isolate = args.GetIsolate();
        Local<Number> value = Local<Number> :: Cast(args[0]);
        double num = value -> NumberValue() + 1;

        char buf[128] = {0};
        sprintf(buf, '%f', num);

        args.GetReturnValue().Set(String :: NewFromUtf8(isolate, buf));
    }
} // namespace hello
