#!/usr/bin/env bash

if [ -z "${HTTP_PORT}" ]; then
    HTTP_PORT=3000
fi
/usr/local/bin/http-server -p $HTTP_PORT