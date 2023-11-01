DECLARE @json NVARCHAR(MAX) = '{"ids": [1, 2, 3, 4]}';

SELECT [value] AS id
FROM OPENJSON(@json, '$.ids');
