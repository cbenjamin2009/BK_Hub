## Current Work In Progress
I am currently working to create new Worksheets that have an assocaited type
This type is derrived from a seaprate WorksheetType table and is a reference on table Worksheet
The /Admin page allows creating of new WorksheetTypes to the Database
The /Worksheet/New page uses a select option to pull the available WorksheetTypes that can be added


## Current Bug
Unable to create a new worksheet when choosing a worksheet type. I believe the value is not referncing the ID correct. 

### Error 
Argument worksheet_type: Got invalid value 'cl5mz0ftr0100fokd3dot8lc1' on prisma.createOneWorksheet. Provided String, expected WorksheetTypeCreateNestedOneWithoutWorksheetInput:
type WorksheetTypeCreateNestedOneWithoutWorksheetInput {
  create?: WorksheetTypeCreateWithoutWorksheetInput | WorksheetTypeUncheckedCreateWithoutWorksheetInput
  connectOrCreate?: WorksheetTypeCreateOrConnectWithoutWorksheetInput
  connect?: WorksheetTypeWhereUniqueInput
}