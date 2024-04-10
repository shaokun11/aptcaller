package apt

import (
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

func ParseHeader(h string) map[string]string {
	header := make(map[string]string)
	headerArr := strings.Split(string(h), "&")
	if len(headerArr) != 2 {
		return HeaderJsonAll
	}
	header["Content-Type"] = headerArr[0]
	header["Accept"] = headerArr[1]
	return header
}
