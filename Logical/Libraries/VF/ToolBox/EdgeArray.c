
#include <bur/plctypes.h>
#ifdef __cplusplus
	extern "C"
	{
#endif
	#include "ToolBox.h"
#ifdef __cplusplus
	};
#endif

/* Trigger edges on an array of booleans */
plcbit EdgePosArray(plcbit* Level, plcbit* PreviousLevel, plcbit* Edge, unsigned short Size)
{
	int i;
	for( i=0; i< Size/sizeof(BOOL); i++ ){		
		if( Level[i] && !PreviousLevel[i] ){
			Edge[i] = 1;	
		}
		PreviousLevel[i] = 	Level[i];
	}
}

/* Trigger edges on an array of booleans */
plcbit EdgeNegArray(plcbit* Level, plcbit* PreviousLevel, plcbit* Edge, unsigned short Size)
{
	int i;
	for( i=0; i< Size/sizeof(BOOL); i++ ){		
		if( !Level[i] && PreviousLevel[i] ){
			Edge[i] = 1;	
		}
		PreviousLevel[i] = 	Level[i];
	}
}

/* Trigger edges on an array of booleans */
plcbit EdgeArray(plcbit* Level, plcbit* PreviousLevel, plcbit* Edge, unsigned short Size)
{
	int i;
	for( i=0; i< Size/sizeof(BOOL); i++ ){		
		if( Level[i] != PreviousLevel[i] ){
			Edge[i] = 1;	
		}
		PreviousLevel[i] = 	Level[i];
	}
}
