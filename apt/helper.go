package apt

import "strconv"

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
