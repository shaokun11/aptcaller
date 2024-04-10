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
	if len(headerArr) != 2 {
		return nil, errors.New("header content error")
	}
	header["Content-Type"] = headerArr[0]
	header["Accept"] = headerArr[1]
	return header, nil
}
