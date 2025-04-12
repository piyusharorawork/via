package util

func AreErrorsSame(err1, err2 error) bool {
	if err1 == nil && err2 == nil {
		return true
	}

	if err1 == nil && err2 != nil {
		return false
	}

	if err1 != nil && err2 == nil {
		return false
	}

	err1Msg := err1.Error()
	err2Msg := err2.Error()

	return err1Msg == err2Msg
}
