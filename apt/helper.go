package apt

import (
	"encoding/hex"
	"errors"
	"strconv"
	"strings"
)

func IsValidQueryStringNum(s string) bool {
	res, err := strconv.Atoi(s)
	if err != nil {
		return false
	}
	return res > 0
}

func IsValidQueryCursor(s string) bool {
	res, err := strconv.Atoi(s)
	if err != nil {
		return true
	}
	return res > 0
}

var HeaderBcs = "application/x-bcs"
var HeaderJson = "application/json"
var HeaderTRANSACTION = "application/x.aptos.signed_transaction+bcs"
var HeaderView = "application/x.aptos.view_function+bcs"

var HeaderJsonAll = map[string]string{
	"Content-Type": "application/json",
	"Accept":       "application/json",
}

func ParseHeader(h string) (map[string]string, error) {
	header := make(map[string]string)
	str, err := hex.DecodeString(h)
	if err != nil {
		return nil, errors.New("parse header error")
	}
	headerArr := strings.Split(string(str), "&")
	header["Content-Type"] = headerArr[0]
	header["Accept"] = headerArr[1]
	return header, nil
}
