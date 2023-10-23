function setPropertyRequired(attributeName, boolValue = true) {
  //обов"язкове
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.required = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setPropertyHidden(attributeName, boolValue = true) {
  //приховане
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.hidden = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setPropertyDisabled(attributeName, boolValue = true) {
  //недоступне
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.disabled = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

//Скрипт 1. Зміна властивостей атрибутів полів карточки
function DetermineResponsibleTask() {
  var stateTask = EdocsApi.getCaseTaskDataByCode(
    "DetermineResponsible" + EdocsApi.getAttributeValue("Sections").value
  )?.state;
  if (
    stateTask == "assigned" ||
    stateTask == "inProgress" ||
    stateTask == "delegated"
  ) {
    setPropertyRequired("ResponsibleEmployee");
    setPropertyHidden("ResponsibleEmployee", false);
    setPropertyDisabled("ResponsibleEmployee", false);
    setPropertyRequired("InformEmloyee", false);
    setPropertyHidden("InformEmloyee", false);
    setPropertyDisabled("InformEmloyee", false);
  } else if (stateTask == "completed") {
    setPropertyRequired("ResponsibleEmployee");
    setPropertyHidden("ResponsibleEmployee", false);
    setPropertyDisabled("ResponsibleEmployee");
    setPropertyRequired("InformEmloyee", false);
    setPropertyHidden("InformEmloyee", false);
    setPropertyDisabled("InformEmloyee");
  } else {
    setPropertyRequired("ResponsibleEmployee", false);
    setPropertyHidden("ResponsibleEmployee");
    setPropertyDisabled("ResponsibleEmployee", false);
    setPropertyRequired("InformEmloyee", false);
    setPropertyHidden("InformEmloyee", false);
    setPropertyDisabled("InformEmloyee", false);
  }
}

function onTaskExecuteDetermineResponsible(routeStage) {
  debugger;
  if (routeStage.executionResult == "executed") {
    if (!EdocsApi.getAttributeValue("ResponsibleEmployee").value)
      throw `Внесіть значення в поле "Доручення"`;
  }
}
function onCardInitialize() {
  debugger;
  EnterInformationTask();
}
