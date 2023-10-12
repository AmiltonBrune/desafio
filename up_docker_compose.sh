#!/bin/bash
docker-compose down
docker network rm backend
docker-compose build
docker-compose up -d
