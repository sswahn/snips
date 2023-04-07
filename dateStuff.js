const diffBetweenDatesInDays = (date1, date2) => 
	Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))

