export function sortOrganismsByInitiative(firstOrganism, secondOrganism) {
  if (secondOrganism.initiative !== firstOrganism.initiative) {
    return secondOrganism.initiative - firstOrganism.initiative;
  }
  return secondOrganism.age - firstOrganism.age;
}