import { serve } from 'https:////deno.land/std@0.50.0/http/server.ts';

for await (const req of serve({hostname: '0.0.0.0', port: 8000})) {
    req.respond({body: 'Hello Deno. \n'});
}