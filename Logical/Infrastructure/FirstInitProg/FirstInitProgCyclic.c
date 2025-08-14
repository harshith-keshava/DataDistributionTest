/********************************************************************
 * COPYRIGHT --  
 ********************************************************************
 * Program: FirstInitProg
 * File: FirstInitProgCyclic.c
 * Author: ScismD
 * Created: January 07, 2014
 ********************************************************************
 * Implementation of program FirstInitProg
 ********************************************************************/

#include <bur/plctypes.h>

#ifdef _DEFAULT_INCLUDES
	#include <AsDefault.h>
#endif


void _CYCLIC FirstInitProgCyclic(void)
{
	gCyclic = 1;
	// DO NOT ADD ANY "OTHER" CYCLIC CODE HERE! //
	if( strcmp(_buildDate, gRevInfo_buildDate) != 0 ){
		gTransfer = 1;
	}
}
