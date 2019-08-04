# ----- protoc
PROTOC_GEN_TS_PATH := ./node_modules/.bin/protoc-gen-ts
PROTO_DIR := ./api/protos
PROTO_FILES := ${shell find api/protos | grep -e '\.proto'}
PROTO_OUT_DIR := ./api
PROTO_BUNDLE_OUT_DIR := ./app/bundlepb.json

 # .PHONY: protoc
# protoc: 
# 	protoc \
# 		--plugin=protoc-gen-ts=${PROTOC_GEN_TS_PATH} \
# 		--js_out="import_style=commonjs,binary:${PROTO_OUT_DIR}" \
# 		--ts_out=${PROTO_OUT_DIR} \
# 		-I ${PROTO_DIR} \
# 		${PROTO_FILES}

 .PHONY: bundlepb
bundlepb:
	./node_modules/protobufjs/bin/pbjs --keep-case -t static-module -w commonjs -o ${PROTO_OUT_DIR}/bundle.js ${PROTO_FILES}
	./node_modules/protobufjs/bin/pbts -o ${PROTO_OUT_DIR}/bundle.d.ts ${PROTO_OUT_DIR}/bundle.js
