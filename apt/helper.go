package apt

import (
	"encoding/hex"
	"encoding/json"
	"errors"
	"strconv"
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

type ReqHeader struct {
	ContentType string `json:"Content-Type"`
	Accept      string `json:"Accept"`
	Chain       string `json:"Chain"`
}

func ParseHeader(h string) map[string]string {
	str, _ := hex.DecodeString(h)
	var req ReqHeader
	var header = make(map[string]string)
	json.Unmarshal(str, &req)
	header["Content-Type"] = req.ContentType
	header["Accept"] = req.Accept
	return header
}

func ParseChain(h string) (string, error) {
	str, err := hex.DecodeString(h)
	if err != nil {
		return "", err
	}
	var req ReqHeader
	if err := json.Unmarshal(str, &req); err != nil {
		return "", err
	}
	chain, ok := SupportChain[req.Chain]
	if !ok {
		return "", errors.New("chain not supported")
	}
	return chain, nil
}
