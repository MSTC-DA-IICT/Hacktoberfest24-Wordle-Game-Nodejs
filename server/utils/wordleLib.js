class wordleLib {
    static compareStrings(generatedWord, userSent) {
        let response = "";
        for (let i = 0; i < generatedWord.length; i++) {
            if (generatedWord[i] === userSent[i]) {
                response += "T";
            } else if (generatedWord.includes(userSent[i])) {
                response += "Y";
            } else {
                response += "F";
            }
        }
        return response;
    }
}

module.exports = wordleLib;