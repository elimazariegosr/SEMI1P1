let aws_keys = {
    s3: {
        region: 'us-east-2',
        accessKeyId: "AKIAYNCEHQNLPYYPEDNP",
        secretAccessKey: "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",
        //apiVersion: '2006-03-01',
    },
    dynamodb: {
        //apiVersion: '2012-08-10',
        region: 'us-east-2',
        accessKeyId: "AKIAYNCEHQNLMEBWPNGK",
        secretAccessKey: "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"
    },
    db_credentials: {
        host: "semi-practica1.cgjxuheag3sv.us-east-2.rds.amazonaws.com",
        port: 3306,
        user: "admin",
        password: "12345678",
        database: "semi1practica1"
    }
}
module.exports = aws_keys;